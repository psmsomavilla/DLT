import {IsEmail, IsNotEmpty, IsString, Matches, MATCHES, MaxLength, MinLength} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class RegisterDto {
    @ApiProperty({example:"carla@gmail.com"})
    @IsEmail({}, { message: "el correo debe tener un formato valido tipo correo@correo.com"})
    mail: string;

    @ApiProperty({example:"Carla"})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({example:"1a34B6789/23"})
    @IsString()
    @MinLength(12, { message: "la contraseña debe de tener 12 caracteres minimo" })
    @MaxLength(12,{message:"la contraseña debe de tener 12 caracteres máximo"})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    password: string;
}

export class LoginDto {
    @ApiProperty({example:"admin@admin.com"})
    @IsEmail({}, { message: "el correo debe tener un formato valido tipo correo@correo.com"})
    @IsString()
    mail: string;

    @ApiProperty({example:"1234Admin/"})
    @IsNotEmpty()
    @MinLength(10,{message:"la contraseña debe de tener 10 caracteres minimo"})
    @MaxLength(10,{message:"la contraseña debe de tener 10 caracteres máximo"})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    password: string;
}




