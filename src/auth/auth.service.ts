import { ForbiddenException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import * as  bcrypt from 'bcrypt'
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) { }

  async signUp(data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>) {

    try {
      
      data.password = Buffer.from(data.password, 'base64').toString('utf-8')
      data.password = await bcrypt.hash(data.password, 10)
      await this.prismaService.user.create({ data })

      return { message: 'User created successfully' }

    } catch (error) {

      if (error.code === 'P2002') {

        const violatedFields = error.meta.target; // Array of violated fields (like ["email"] or ["username"])

        if (violatedFields.includes('email'))
          throw new ForbiddenException('A user already exists with the same email.')

        throw new UnprocessableEntityException(`A unique constraint violation occurred these in fields.\n${violatedFields}`)

      }

      throw error

    }



  }


  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }


  async login(user: User) {
    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
