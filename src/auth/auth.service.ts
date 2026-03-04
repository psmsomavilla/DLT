import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginDTO } from './dto/login-auth.dto';

@Injectable()
export class AuthService {


  async register(userObject: RegisterAuthDto) {

    return { message: 'Usuario registrado con éxito', data: userObject };
  }


  async login(loginDto: LoginDTO) {
    //  lógica de validar email y password
    return { message: 'Login correcto', token: 'aquí-irá-el-jwt' };
  }
}