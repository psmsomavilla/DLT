import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @IsEmail({}, { message: "el correo debe tener un formato valido tipo correo@correo.com"})
    mail: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @MinLength(6, { message: "la conrtaseña debe de tener 6 caracteres minimo" })
    password: string;
}

export class LoginDto {
    @IsEmail({}, { message: "el correo debe tener un formato valido tipo correo@correo.com"})
    mail: string;

    @IsNotEmpty()
    password: string;
}




