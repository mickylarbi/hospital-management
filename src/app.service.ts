import { Injectable } from '@nestjs/common';
import { GenkitService } from './genkit/genkit.service';
import { PrismaService } from 'nestjs-prisma';
import { z } from 'zod';

@Injectable()
export class AppService {
  constructor(
    private readonly genkitService: GenkitService,
    private readonly prismaService: PrismaService
  ) { }


  async getHelloInFrench() {

    const note = `To get started, it's important to take care of a couple of things right away. Head to the pharmacy and pick up the medication you'll need. Be sure to carefully check the label and confirm that it matches exactly what’s required. It’s a quick task but crucial to ensuring everything goes smoothly in the days ahead.

Once you have it, it’s time to settle into a routine. For the next seven days, make a habit of taking the medication at the same time each day. Setting a reminder on your phone or jotting it down in your calendar can help keep you on track. The key is consistency, so try to make it part of your daily rhythm. After taking it each time, make a quick note or mark it off in your planner to keep track of your progress. By the end of the week, you'll have a good sense of how things are going and whether there's anything that needs adjusting.`

    return await this.genkitService.generateActionableSteps(note);
  }



  async addDoctorNote(id: string, notes: string) {
    const doctorPatient = await this.prismaService.doctorPatients.update({
      where: { id },
      data: { notes }
    })

    const actionableSteps = JSON.parse(await this.genkitService.generateActionableSteps(notes))
    await this.prismaService.checklist.deleteMany({ where: { doctorPatientId: id } })
    await this.prismaService.plan.deleteMany({ where: { doctorPatientId: id } })

    if (actionableSteps.checklist && actionableSteps.checklist.length !== 0)
      await this.prismaService.checklist.createMany({
        data: (actionableSteps.checklist as string[])
          .map(e => {
            return { action: e, doctorPatientId: doctorPatient.id }
          })
      })

    if (actionableSteps.plans && actionableSteps.plans.length !== 0) {
      const plans = actionableSteps.plans as Array<any>
      for (let plan of plans) {
        const newPlan = await this.prismaService.plan.create({
          data: {
            doctorPatientId: id, action: plan.action
          }
        })
        const schedule = await this.prismaService.schedule.createMany({
          data: (plan.schedule as { dayOfWeek: string, timeOfDay: string }[]).map(e => {
            return { planId: newPlan.id, ...e }
          })
        })


      }
    }

    return doctorPatient

  }


  async getActionableSteps(id: string) {
    const result = await this.prismaService.doctorPatients.findUnique({
      where: { id },
      include: {
        checklist: true,
        plans: { include: { schedule: true } }
      }
    })

    return {
      checklist: result.checklist.map(e => e.action),
      plans: result.plans.map(e => {
        return {
          action: e.action,
          schedule: e.schedule.map(f => {
            return { dayOfWeek: f.dayOfWeek, timeOfDay: f.timeOfDay }
          })
        }
      })
    }
  }
}


