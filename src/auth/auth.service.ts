import {Injectable, NotFoundException, BadRequestException, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {RejectUserDto, VerifyUserDto} from "./dto/verify-user.dto";
import {User, UserRole} from "../users/entities/user.entity";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {Verification} from "../verification/verification.entity";
import {LoginDto, RegisterDto} from "./dto/register-auth.dto";



@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Verification)
        private verificationRepository: Repository<Verification>,
        private readonly jwtService: JwtService,
    ) {}

    async getUnverifiedUsers() {
        return this.userRepository.find({
            where: {
                isValidated: false
            },

            select: ["id","mail","name","created_at","isValidated"],
        });
    }


    async verifyUser(verifyDto: VerifyUserDto) {
        const pending = await this.verificationRepository.findOne({
            where: { targetEmail: verifyDto.mail, verificationToken: verifyDto.verificationToken },
        });

        if (!pending) {
            throw new NotFoundException("token o email no coinciden");
        }

        const user = await this.userRepository.findOne({ where: { mail: verifyDto.mail } });
        if (!user) throw new NotFoundException("Usuario no encontrado ");

        user.isValidated = true;
        user.role = UserRole.user;
        await this.userRepository.save(user);

        return { message: "Usuario validado con éxito" };


    }


    async rejectUser(rejectDto: RejectUserDto) {
        const user = await this.userRepository.findOne({
            where: { mail: rejectDto.mail }
        });

        if (!user) {
            throw new NotFoundException("Usuario no encontrado");
        }


        await this.userRepository.softRemove(user);

        return { message: "Usuario rechazado y eliminado" };
    }

    async register(registerDto: RegisterDto) {
        const { mail, password, name } = registerDto;

        // verificamos si existe
        const existingUser = await this.userRepository.findOne({ where: { mail } });
        if (existingUser) {
            throw new BadRequestException("Correo ya registrado");
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = this.userRepository.create({
            mail,
            name,
            password: hashedPassword,
            role: UserRole.none,
        });

        await this.userRepository.save(newUser);

        const generatedToken = Math.random().toString(36).substring(2, 8).toUpperCase();


        const newVerification = this.verificationRepository.create({
            targetEmail: mail,
            verificationToken: generatedToken,
            name: name,
            password: hashedPassword,
        });
        await this.verificationRepository.save(newVerification);


        return {
            message: "Admin debe validar tu usuario",
            debugToken: generatedToken
        };
    }

    async login(loginDto: LoginDto) {
        const { mail, password } = loginDto;

        const user = await this.userRepository.findOne({ where: { mail } });


        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException("Datos incorrectos");
        }


        if (!user.isValidated) {
            throw new UnauthorizedException("Cuenta aún no validada");
        }


        const payload = { sub: user.id, mail: user.mail, role: user.role };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }



}