import {IsEmail, IsEnum, IsOptional, IsString, MinLength} from "class-validator";
import {UserRole} from "../entities/user.entity";

// los dto nos aseguran que los datos que entran en la bd sean correctos

export class CreateUserDto{
    @IsString()
    name:string;

    @IsEmail({},{message:"El mail no es válido"})
    mail:string;

    @MinLength(6,{message: "La contraseña debe de tener al menos 6 caracteres"})
    password:string;

    @IsEnum(UserRole)
    role?:string;




}