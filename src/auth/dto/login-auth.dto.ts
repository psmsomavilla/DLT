import {IsEmail, MaxLength} from "class-validator";

export class LoginDTO {

    @IsEmail()
    email: string;

    @MaxLength(6)
    password: string;
}
