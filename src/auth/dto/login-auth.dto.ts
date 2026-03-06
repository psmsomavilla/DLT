import {IsEmail, IsNotEmpty, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class LoginDTO {

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    mail: string;

    @ApiProperty()
    @MinLength(6)
    password: string;
}
