import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginDTO } from './dto/login-auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}






}
