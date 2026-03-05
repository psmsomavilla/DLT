import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

// gracias a la herencia extraemos la seguridad de la libreria passport
// lo ponemos encima de las funciones que queramos que no sean públicas