import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {RejectUserDto, VerifyUserDto} from "./dto/verify-user.dto";
import {Roles} from "./decorators/roles.decorator";
import {UserRole} from "../users/entities/user.entity";
import {LoginDto, RegisterDto} from "./dto/register-auth.dto";
import { AuthGuard } from "./guards/auth.guard";
import { RolesGuard } from "./guards/roles.guard";
import {ApiBearerAuth} from "@nestjs/swagger";




@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}



@Post("register")
async register(@Body() registerDto: RegisterDto){
    return this.authService.register(registerDto);
}



@Post("login")
async login (@Body() loginDto:LoginDto){
    return this.authService.login(loginDto);
}

@ApiBearerAuth()
@Get("unverified")
@UseGuards(AuthGuard,RolesGuard)
@Roles(UserRole.admin)
async getUnverified(){
   return this.authService.getUnverifiedUsers();
}

@Post("verify")
@Roles(UserRole.admin)
async verifyUser(@Body()verifyDto:VerifyUserDto){
      return this.authService.verifyUser(verifyDto);
}

@Post("reject")
@Roles(UserRole.admin)
async rejectUser(@Body() rejectDto:RejectUserDto){
      return this.authService.rejectUser(rejectDto);
}
















}
