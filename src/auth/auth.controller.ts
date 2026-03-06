import {Controller, Post, UseGuards, Request, Body, Get} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {UserService} from "../users/user.service";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {JwtAuthGuard} from "./guards/jwt-auth.guards";




@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private userService:UserService) {}



@Post("auth/register")
async register(@Body() body: CreateUserDto){
    return this.userService.createUser(body);
}



@UseGuards(LocalAuthGuard)
@Post("auth/login")
async login (@Request() req){
    return this.authService.login(req.user);
}

@UseGuards(JwtAuthGuard)
@Get("auth/profile")
async profile(@Request() req){
    return await this.userService.findOneUserId(req.user.id);
}
















}
