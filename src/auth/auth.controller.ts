import {Controller, Post, UseGuards, Request, Body, Get, UnauthorizedException} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {UserService} from "../users/user.service";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {JwtAuthGuard} from "./guards/jwt-auth.guards";
import {ApiBody, ApiTags} from "@nestjs/swagger";
import {LoginDTO} from "./dto/login-auth.dto";



@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private userService:UserService) {}



@Post("register")
async register(@Body() body: CreateUserDto){
    return this.userService.createUser(body);
}


@ApiBody({type: LoginDTO})
@UseGuards(LocalAuthGuard)
@Post("login")
async login (@Request() req){
    return this.authService.login(req.user);
}

@UseGuards(JwtAuthGuard)
@Get("profile")
async profile(@Request() req){
    return await this.userService.findOneUserId(req.user.id);
}

@Post('verify')
@UseGuards(JwtAuthGuard)
async verifyUser(@Body('mail') mail: string, @Request() req) {

  if (req.user.role !== 'admin') {
      throw new UnauthorizedException("Solo el admin puede verificar cuentas");
    }
  return this.authService.verifyUserByMail(mail);
  }

















}
