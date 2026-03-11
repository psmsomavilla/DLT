import {IsEmail, IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class VerifyUserDto {
    @ApiProperty({example:"carla@gmail.com"})
    @IsEmail({},{message: "El correo debe tener un formato válido tipo correo@correo.com"})
    @IsNotEmpty({message:"El correo no puede estar vacio"})
    mail:string;


    @IsString()
    @IsNotEmpty({message:"El token de verificacion es necesario"})
    verificationToken:string;


}

export class RejectUserDto {
    @IsEmail({}, { message: "El correo debe tener un formato válido tipo correo@correo.com" })
    @IsNotEmpty({ message: "El correo no puede estar vacío" })
    mail: string;
}
