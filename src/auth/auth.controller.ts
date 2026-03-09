import {Body, Controller, Get, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {UserService} from "../users/user.service";
import {ApiTags} from "@nestjs/swagger";
import {VerifyUserDto} from "./dto/verify-user.dto";
import {Roles} from "./decorators/roles.decorator";
import {UserRole} from "../users/entities/user.entity";


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private userService:UserService) {}



@Post("register")
async register(@Body() registerDto: RegisterDto){
    return this.authService.register(registerDto);
}



@Post("login")
async login (@Body() loginDto:LoginDto){

}


@Get("unverified")
@Roles(UserRole.admin)
async getUnverified(){
   return this.userService.findPendingUsers();
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
