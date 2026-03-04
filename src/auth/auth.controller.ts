import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginDTO } from './dto/login-auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  registerUser(@Body() userObject: RegisterAuthDto){
    console.log({body:userObject});
    return this.authService.register(userObject);

  }


  @Post("login")
  loginUser(@Body() loginDto: LoginDTO) {

    return this.authService.login(loginDto);
  }




}
