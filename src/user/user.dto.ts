import { IsEmail, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class UserDto {
    @IsUUID()
    @IsOptional()
    id: string;

    @IsString()
    @MinLength(3)
    @MaxLength(255)
    name: string;

    @IsEmail()
    email: string;

    @MinLength(3)
    @MaxLength(10)
    password: string;
}


export interface UserRequest extends Request {
    user?: {
        sub: string,
        username: string,
        iat: number,
        exp: number
    };
  }