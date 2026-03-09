import {IsEmail, IsNotEmpty, IsString} from "class-validator";


export class VerifyUserDto {
    @IsEmail({},{message: "El correo debe tener un formato válido"})
    @IsNotEmpty({message:"El correo no puede estar vacio"})
    mail:string;


    @IsString()
    @IsNotEmpty({message:"El token de verificacion es necesario"})
    verificationToken:string;


}

export class RejectUserDto {
    @IsEmail({}, { message: 'El correo debe tener un formato válido' })
    @IsNotEmpty({ message: 'El correo no puede estar vacío' })
    mail: string;
}
