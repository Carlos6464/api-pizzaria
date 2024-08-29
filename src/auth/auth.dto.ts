import { IsEmail, MaxLength, MinLength } from "class-validator";

export class UserLoginDto {
    @IsEmail()
    email: string

    @MinLength(3)
    @MaxLength(10)
    password: string
}


export interface  AuthResponseDto {
    id: string;
    name: string;
    email: string;
    token: string;
    expiresIn: number;
}

