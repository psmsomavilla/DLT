import {Body, Controller, Post, UseGuards,} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {LoginDTO} from "./dto/login-auth.dto";
import {VerifyUserDto} from "./dto/verify-user.dto";
import {Roles} from "./decorators/roles.decorator";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //estas serán las rutas para los nuevos usuarios
  @Post("login")
  async login(@Body() loginDto:LoginDTO){
    return this.authService.login(loginDto.mail,loginDto.password);
  }

  @Post('register')
  register(@Body()registerDto:CreateUserDto){}












}
