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
        return this.verificationRepository.find({

            select: ["id","targetEmail","name","verificationToken","createdAt"],
            order:{createdAt:"DESC"}
        });
    }


    async verifyUser(verifyDto: VerifyUserDto) {
        const pending = await this.verificationRepository.findOne({
            where: { targetEmail: verifyDto.mail, verificationToken: verifyDto.verificationToken },
        });

        if (!pending) {
            throw new NotFoundException("token o email no coinciden");
        }

        const newUser = this.userRepository.create({
            mail: pending.targetEmail,
            name: pending.name,
            password: pending.password,
            role: UserRole.user,
            isValidated: true,
        });

        await this.userRepository.save(newUser);


        await this.verificationRepository.remove(pending);

        return { message: "Usuario activado correctamente" };
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
        const {mail, password, name} = registerDto;

        // verificamos si existe
        const existingUser = await this.userRepository.findOne({where: {mail}});
        if (existingUser) {
            throw new BadRequestException("Correo ya registrado");
        }

        const existingPending = await this.verificationRepository.findOne({where: {targetEmail: mail}});
        if (existingPending) throw new BadRequestException("Ya existe una solicitud pendiente para este correo");

        const hashedPassword = await bcrypt.hash(password, 10);
        const generatedToken = Math.random().toString(36).substring(2, 8).toUpperCase();


        const newRequest = this.verificationRepository.create({
            targetEmail: mail,
            verificationToken: generatedToken,
            name: name,
            password: hashedPassword,
        });

        await this.verificationRepository.save(newRequest);

        return {
            message: "Solicitud enviada al administrador",
            tokenGenerado: generatedToken
        }
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