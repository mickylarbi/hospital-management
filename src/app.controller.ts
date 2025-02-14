import { Body, Controller, Get, Param, Patch, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { JwtAuthGuard, Public } from './auth/jwt-auth.guard';
import { DoctorPatients, Role } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService
  ) { }

  // @Public()
  // @Get()
  // async getHello() {
  //   return await this.appService.getHelloInFrench();
  // }


  @Get('doctors')
  async getDoctors(@Request() req) {

    if (req.user.role !== Role.PATIENT) throw new UnauthorizedException('user is not a patient')
    return await this.userService.findDoctors()

  }


  @Get('patients')
  async getPatients(@Request() req) {

    if (req.user.role !== Role.DOCTOR) throw new UnauthorizedException('user is not a doctor')
    return await this.userService.findPatients(req.user.id)

  }

  @Patch('patients/:patientId/notes')
  async addPatientNotes(@Request() req, @Param('patientId') patientId: string, @Body() body: { notes: string }) {

    if (req.user.role !== Role.DOCTOR) throw new UnauthorizedException('user is not a doctor')
    const doctorPatients = (req.user.patients as DoctorPatients[]).filter(e => e.patientId === patientId)
    if (doctorPatients.length === 0) throw new UnauthorizedException('patient has not been assigned to user')

    return await this.appService.addDoctorNote(doctorPatients[0].id, body.notes)

  }

  @Get('patients/:patientId/actionable-steps')
  async getPatientActionableSteps(@Request() req, @Param('patientId') patientId: string) {

    if (req.user.role !== Role.DOCTOR) throw new UnauthorizedException('user is not a doctor')
    const doctorPatients = (req.user.patients as DoctorPatients[]).filter(e => e.patientId === patientId)
    if (doctorPatients.length === 0) throw new UnauthorizedException('patient has not been assigned to user')

    return await this.appService.getActionableSteps(doctorPatients[0].id)

  }

  @Get('doctors/:doctorId/actionable-steps')
  async getDoctorActionableSteps(@Request() req, @Param('doctorId') doctorId: string) {

    if (req.user.role !== Role.PATIENT) throw new UnauthorizedException('user is not a patient')
    const doctorPatients = (req.user.doctors as DoctorPatients[]).filter(e => e.doctorId === doctorId)
    if (doctorPatients.length === 0) throw new UnauthorizedException('doctor has not been assigned to user')

    return await this.appService.getActionableSteps(doctorPatients[0].id)

  }


  @Post('doctors/:doctorId/assign')
  async assignPatientToDoctor(@Param('doctorId') doctorId: string, @Request() req) {

    if (req.user.role !== Role.PATIENT) throw new UnauthorizedException('user is not a patient')
    return await this.userService.assignPatientToDoctor(doctorId, req.user.id)

  }



  // @Get('doctors/:doctorId/patients')
  // async getDoctorPatients(@Param('doctorId') doctorId: string, @Request() req) {
  //   console.log(req.user)
  //   return await this.userService.findDoctorPatients(doctorId)
  // }

  // @Get('patients/:patientId/doctors')
  // async getPatientDoctors(@Param('patientId') patientId: string, @Request() req) {
  //   console.log(req.user)
  //   return await this.userService.findPatientDoctors(patientId)
  // }


}
