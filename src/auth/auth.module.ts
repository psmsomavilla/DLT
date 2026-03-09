import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UserModule} from "../users/user.module";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import * as process from "node:process";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Verification} from "../verification/verification.entity";
import {User} from "../users/entities/user.entity";



@Module({
  imports: [
    TypeOrmModule.forFeature([User,Verification]),
    UserModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWTsecret || "clave",
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
