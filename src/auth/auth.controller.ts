import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {RejectUserDto, VerifyUserDto} from "./dto/verify-user.dto";
import {Roles} from "./decorators/roles.decorator";
import {UserRole} from "../users/entities/user.entity";
import {LoginDto, RegisterDto} from "./dto/register-auth.dto";
import { AuthGuard } from "./guards/auth.guard";
import { RolesGuard } from "./guards/roles.guard";
import {ApiBearerAuth, ApiOperation, ApiTags} from "@nestjs/swagger";



@ApiTags("auth - Autenticación de usuarios")
@Controller("api/v1/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}



@Post("login")
@ApiOperation({summary:"Iniciar sesión en la plataforma. Devuelve \"accessToken\" si el inicio es correcto"})
async login (@Body() loginDto:LoginDto){
    return this.authService.login(loginDto);
}


@Post("register")
@ApiOperation({summary: "Registro de usuario nuevo, debe ser verificado antes de usar la plataforma"})
async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
}


@Post("reject")
@ApiOperation({summary:"SUPER_ADMIN: Rechaza todas las invitaciones pendientes asociadas a un email"})
@Roles(UserRole.admin)
async rejectUser(@Body() rejectDto:RejectUserDto) {
    return this.authService.rejectUser(rejectDto);
}


@ApiBearerAuth()
@Get("unverified")
@ApiOperation({summary:"SUPER_ADMIN: Muestra todos los registros sin aprobar"})
@UseGuards(AuthGuard,RolesGuard)
@Roles(UserRole.admin)
async getUnverified(){
   return this.authService.getUnverifiedUsers();
}

@Post("verify")
@ApiOperation({summary:"SUPER_ADMIN: Usando mail y verificationToken, verifica un usuario para poder usar la plataforma"})
@Roles(UserRole.admin)
async verifyUser(@Body()verifyDto:VerifyUserDto){
      return this.authService.verifyUser(verifyDto);
}


















}
