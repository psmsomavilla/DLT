import {IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class RegisterDto {
    @ApiProperty({example:"carla@gmail.com"})
    @IsEmail({}, { message: "el correo debe tener un formato valido tipo correo@correo.com"})
    mail: string;

    @ApiProperty({example:"Carla"})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({example:"Carlas12345!"})
    @IsString()
    @MinLength(10, { message: "la contraseña debe de tener 10 caracteres minimo" })
    @MaxLength(15,{message:"la contraseña debe de tener menos de 15 caracteres"})
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d|.*\W).+$/)
    password: string;
}

export class LoginDto {
    @ApiProperty({example:"admin@admin.com"})
    @IsEmail({}, { message: "el correo debe tener un formato valido tipo correo@correo.com"})
    @IsString()
    mail: string;

    @ApiProperty({example:"Admin12345!"})
    @IsNotEmpty()
    @MinLength(10,{message:"la contraseña debe de tener 10 caracteres minimo"})
    @MaxLength(15,{message:"la contraseña debe de tener 15 caracteres máximo"})
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d|.*\W).+$/)
    password: string;
}




