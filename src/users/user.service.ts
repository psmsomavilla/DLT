import {Injectable, OnModuleInit} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User, UserRole} from "./entities/user.entity";
import * as bcrypt from 'bcrypt';
import {CreateUserDto} from "./dto/create-user.dto";



// esta clase se podra compartir con otras
@Injectable()
export class UserService implements OnModuleInit{
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    }
    // ahora tenemos acceso a la tabla User



    // ejecutamos el modulo y se arranca automáticamente
    // ponemos aqui la seed para que el user admin se cree automaticamente al arrancar
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
            //encriptación de la pass
            const passAdmin = await bcrypt.hash("1234", 10);

            const admin = this.userRepository.create({
                mail:adminEmail,
                password: passAdmin,
                name: "admin",
                role: UserRole.admin,
                isValidated: true,

            });
            await this.userRepository.save(admin);
            console.log("Usuario admin creado");


        }

    }



    // MÉTODOS PARA EL ADMIN

    /**
     * Metodo que sirve para que el admin pueda listar al resto de usuarios
     */
    findAll(){
        return this.userRepository.find();
    }


    /**
     * autenticacion del login validamos la contrañsea
     * @param mail
     */
     async validate(mail:string){
        return await this.userRepository.findOne({where:{mail},
        select:["id","mail","password","role","isValidated","name"]});

     }


    /**
     * método para conceder o denegar acceso
     * @param id
     * @param status
     */
     async validateUser(id: number,status:boolean){
         const user = await this.userRepository.findOneBy({id});
         if(!user) return null; // si el id no existe devolvemos null
         user.isValidated=status; // cambio de validacion
         return await this.userRepository.save(user);
     }


    /**
     * creacion de usuario desde el registro
     * @param createUserDto
     */
    async createUser(createUserDto: CreateUserDto){
         // encriptamos la pass que viene dl DTO
         const passUser = await bcrypt.hash(createUserDto.password, 10);

         // creamos la entidad
         const newUser = this.userRepository.create({
             ... createUserDto,
             password: passUser,
             role:UserRole.user,
             isValidated:false,

         })

        return await this.userRepository.save(newUser);


     }





}