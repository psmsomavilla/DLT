import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyUserDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    userId: number;
}