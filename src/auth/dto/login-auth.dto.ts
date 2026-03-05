import {IsEmail, IsNotEmpty, MinLength} from "class-validator";

export class LoginDTO {

    @IsEmail()
    @IsNotEmpty()
    mail: string;

    @MinLength(6)
    password: string;
}
