import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'nestjs-prisma';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) { }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async assignPatientToDoctor(doctorId: string, patientId: string) {
    return await this.prismaService.doctorPatients.create({
      data: { doctorId, patientId }
    })
  }

  findAll() {
    return `This action returns all user`;
  }

  async findDoctors() {
    return await this.prismaService.user.findMany({ where: { role: 'DOCTOR' } })
  }

  async findPatients(doctorId: string) {
    return (await this.prismaService.doctorPatients
      .findMany({
        where: { doctorId },
        include: { patient: true }
      }))
      .map(e => e.patient)
  }

  async findDoctorPatients(doctorId: string) {
    return await this.prismaService.doctorPatients.findMany({
      where: { doctorId }
    })
  }

  async findPatientDoctors(patientId: string) {
    return await this.prismaService.doctorPatients.findMany({
      where: { patientId }
    })
  }

  async findOne(id: string) {
    return await this.prismaService.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.prismaService.user.findUnique({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {




    // const patients: { name: string, role: Role, email: string, password: string }[] = [
    //   {
    //     name: "Lily Robinson",
    //     role: "PATIENT",
    //     email: "lily.robinson@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "William Walker",
    //     role: "PATIENT",
    //     email: "william.walker@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Grace Lewis",
    //     role: "PATIENT",
    //     email: "grace.lewis@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Henry White",
    //     role: "PATIENT",
    //     email: "henry.white@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Ava Moore",
    //     role: "PATIENT",
    //     email: "ava.moore@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Daniel Green",
    //     role: "PATIENT",
    //     email: "daniel.green@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Sophia Jackson",
    //     role: "PATIENT",
    //     email: "sophia.jackson@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Jack Martin",
    //     role: "PATIENT",
    //     email: "jack.martin@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Mia Davis",
    //     role: "PATIENT",
    //     email: "mia.davis@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Zoe Hernandez",
    //     role: "PATIENT",
    //     email: "zoe.hernandez@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Michael Garcia",
    //     role: "PATIENT",
    //     email: "michael.garcia@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Isabella Martinez",
    //     role: "PATIENT",
    //     email: "isabella.martinez@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "David Perez",
    //     role: "PATIENT",
    //     email: "david.perez@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Charlotte Robinson",
    //     role: "PATIENT",
    //     email: "charlotte.robinson@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Ryan Young",
    //     role: "PATIENT",
    //     email: "ryan.young@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Ella Scott",
    //     role: "PATIENT",
    //     email: "ella.scott@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Oliver Martinez",
    //     role: "PATIENT",
    //     email: "oliver.martinez@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Lucas Taylor",
    //     role: "PATIENT",
    //     email: "lucas.taylor@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Amelia Harris",
    //     role: "PATIENT",
    //     email: "amelia.harris@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Benjamin Clark",
    //     role: "PATIENT",
    //     email: "benjamin.clark@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   }
    // ];
    // const doctors: { name: string, role: Role, email: string, password: string }[] = [
    //   {
    //     name: "Dr. Olivia Carter",
    //     role: "DOCTOR",
    //     email: "olivia.carter@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Dr. Daniel King",
    //     role: "DOCTOR",
    //     email: "daniel.king@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Dr. Natalie Anderson",
    //     role: "DOCTOR",
    //     email: "natalie.anderson@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Dr. Ethan White",
    //     role: "DOCTOR",
    //     email: "ethan.white@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Dr. Chloe Harris",
    //     role: "DOCTOR",
    //     email: "chloe.harris@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Dr. James Robinson",
    //     role: "DOCTOR",
    //     email: "james.robinson@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Dr. Abigail Thompson",
    //     role: "DOCTOR",
    //     email: "abigail.thompson@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Dr. Benjamin Martin",
    //     role: "DOCTOR",
    //     email: "benjamin.martin@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Dr. Grace Wilson",
    //     role: "DOCTOR",
    //     email: "grace.wilson@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Dr. Samuel Lee",
    //     role: "DOCTOR",
    //     email: "samuel.lee@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Dr. Victoria Clark",
    //     role: "DOCTOR",
    //     email: "victoria.clark@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Dr. Lucas Adams",
    //     role: "DOCTOR",
    //     email: "lucas.adams@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Dr. Mia Carter",
    //     role: "DOCTOR",
    //     email: "mia.carter@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Dr. Alexander Young",
    //     role: "DOCTOR",
    //     email: "alexander.young@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Dr. Emily Scott",
    //     role: "DOCTOR",
    //     email: "emily.scott@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Dr. Christopher Davis",
    //     role: "DOCTOR",
    //     email: "christopher.davis@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Dr. Lily Turner",
    //     role: "DOCTOR",
    //     email: "lily.turner@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Dr. William Perez",
    //     role: "DOCTOR",
    //     email: "william.perez@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   },
    //   {
    //     name: "Dr. Sophia Roberts",
    //     role: "DOCTOR",
    //     email: "sophia.roberts@email.com",
    //     password: "dmVyeSBzZWN1cmUgcGFzc3dvcmQ="
    //   }
    // ];

    // const allWithHashedPasswords = [
    //   ...patients.map(e => {
    //     return { ...e, password: bcrypt.hashSync(e.password, 10) }
    //   }),
    //   ...doctors.map(e => {
    //     return { ...e, password: bcrypt.hashSync(e.password, 10) }
    //   })
    // ]

    // await this.prismaService.user.updateMany({ data: { password: bcrypt.hashSync('a very secure password', 10) } })

    return;
  }
}
