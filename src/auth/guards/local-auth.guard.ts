import {AuthGuard} from "@nestjs/passport";
import {Injectable} from "@nestjs/common";

@Injectable()
export class LocalAuthGuard extends AuthGuard("local"){}

// gracias a la herencia extraemos la seguridad de la libreria passport
// lo ponemos encima de las funciones que queramos que no sean públicas