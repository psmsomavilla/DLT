import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UserModule} from "../users/user.module";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import * as process from "node:process";

@Module({
  imports: [UserModule,PassportModule,JwtModule.register({secret:process.env.JWTsecret,signOptions:{expiresIn:"60s"}})],
  controllers: [AuthController],
  providers: [AuthService],

})
export class AuthModule {}
