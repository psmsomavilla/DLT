import {IsEmail, IsNotEmpty, IsString, MaxLength} from "class-validator";

export class RegisterAuthDto{

    @IsEmail()
    @IsNotEmpty()
    mail: string;

    @IsNotEmpty()
    @MaxLength(6) //
    password: string;

    @IsString()
    @IsNotEmpty()
    name: string;



}



