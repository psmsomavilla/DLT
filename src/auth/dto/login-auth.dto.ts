import {IsEmail, IsNotEmpty, MaxLength} from "class-validator";

export class LoginDTO {

    @IsEmail()
    @IsNotEmpty()
    mail: string;

    @MaxLength(6)
    password: string;
}
