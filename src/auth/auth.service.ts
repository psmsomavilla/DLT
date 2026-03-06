import {ConflictException, Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {User} from "../users/entities/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}


    async validateUser(body: CreateUserDto){


        try{
            const user = await this.userService.findOneUserName(body.name);

            if(user){
                throw new ConflictException("El nombre de usuario ya existe");
            }

            return {message: "Nombre disponible"}

        }catch(error){
            if(error instanceof Error) throw new InternalServerErrorException(error.message);
        }

    }



    async login(user: User) {
        const payload = { username: user.name, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}