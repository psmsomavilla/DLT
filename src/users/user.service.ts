import {Injectable, OnModuleInit} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User, UserRole} from "./entities/user.entity";


// esta clase se podra compartir con otras
@Injectable()
export class UserService implements OnModuleInit{
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    }
    // ahora tenemos acceso a la tabla User


    // ejecutamos el modulo y se arranca automáticamente
    async onModuleInit(){
        await this.seedAdmin();

    }

    /**
     * logica para la creacion de nuestro admin
     * @private
     */
    private async seedAdmin(){
        const adminEmail = "admin@admin.com"
        const exists = await this.userRepository.findOne({where:{mail:adminEmail}});
        // preguntamos a la bd si el admin mail existe

        if(!exists){

            const admin = this.userRepository.create({
                mail:adminEmail,
                password: "1234",
                name: "admin",
                role: UserRole.admin,
                isValidated: true,

            });
            await this.userRepository.save(admin);
            console.log("Usuario admin creado correctamente");


        }

    }

    /**
     * Metodo que sirve para que el admin pueda listar al resto de usuarios
     */
    findAll(){
        return this.userRepository.find();
    }

}