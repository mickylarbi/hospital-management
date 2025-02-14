import { Role } from "@prisma/client"
import { IsEmail, IsEnum, IsString } from "class-validator"

export class SignUpDto {

    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsString()
    password: string

    @IsEnum(Role)
    role: Role
    
}
