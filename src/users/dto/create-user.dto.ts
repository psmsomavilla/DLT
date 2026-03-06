import {IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength} from "class-validator";
import {UserRole} from "../entities/user.entity";

// los dto nos aseguran que los datos que entran en la bd sean correctos

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsEmail({},{message:"El mail no es válido"})
    @IsNotEmpty()
    mail:string;

    @MinLength(6,{message: "La contraseña debe de tener al menos 6 caracteres"})
    @IsNotEmpty()
    password:string;

    @IsEnum(UserRole)
    role?:string;




}