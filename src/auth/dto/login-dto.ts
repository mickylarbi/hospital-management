import { IsBase64, IsEmail } from "class-validator"

export class LoginDto {

    @IsEmail()
    email: string

    @IsBase64()
    password: string

}