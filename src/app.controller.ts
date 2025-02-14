import { Controller, Get, Param, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { JwtAuthGuard, Public } from './auth/jwt-auth.guard';
import { Role } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService
  ) { }

  @Public()
  @Get()
  async getHello() {
    return await this.userService.remove(1);
  }


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
