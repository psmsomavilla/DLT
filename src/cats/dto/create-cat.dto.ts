import {IsIn, IsString} from "class-validator";

export class CreateCatDto {

    @IsString()
    name: string;

    @IsString()
    breed: string;







}
