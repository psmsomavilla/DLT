import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}


    async login(mail: string, pass: string) {

        const user = await this.userService.buscarPorMail(mail);


        if (user && user.password === pass) {
            const payload = { mail: user.mail, sub: user.id, role: user.role };

            return {
                access_token: this.jwtService.sign(payload),
                user: {
                    name: user.name,
                    mail: user.mail,
                    role: user.role
                }
            };
        }


    }
}