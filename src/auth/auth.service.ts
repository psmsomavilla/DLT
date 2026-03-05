import {Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}


    async login(mail: string, pass: string) {

        const user = await this.userService.buscarPorMail(mail);

        if (!user) {
            throw new UnauthorizedException("usuario no encontrado");
        }
        const iguales = await bcrypt.compare(pass, user.password);

        if (iguales) {
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