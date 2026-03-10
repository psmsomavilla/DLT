import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class RegisterDto {
    @ApiProperty({example:"carla@gmail.com"})
    @IsEmail({}, { message: "el correo debe tener un formato valido tipo correo@correo.com"})
    mail: string;

    @ApiProperty({example:"Carla"})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({example:"123456"})
    @IsString()
    @MinLength(6, { message: "la contraseña debe de tener 6 caracteres minimo" })
    password: string;
}

export class LoginDto {
    @ApiProperty({example:"admin@admin.com"})
    @IsEmail({}, { message: "el correo debe tener un formato valido tipo correo@correo.com"})
    @IsString()
    mail: string;

    @ApiProperty({example:"1234"})
    @IsNotEmpty()
    password: string;
}




