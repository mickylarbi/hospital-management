import { Role } from "@prisma/client"
import { IsBase64, IsEmail, IsEnum, IsString } from "class-validator"

export class SignUpDto {

    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsBase64()
    password: string

    @IsEnum(Role)
    role: Role
    
}
