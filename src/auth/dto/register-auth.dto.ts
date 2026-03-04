import {PartialType} from "@nestjs/swagger";
import {LoginDTO} from "./login-auth.dto";
import {IsString} from "class-validator";

export class RegisterAuthDto extends PartialType(LoginDTO){ // extendemos las propiedades del login

   @IsString()
    name:string;


}
