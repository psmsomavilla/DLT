import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User, UserRole} from "./entities/user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';




// esta clase se podra compartir con otras
@Injectable()
export class UserService  {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    }
    // ahora tenemos acceso a la tabla User


    /**
     * crea el admin
     * @param adminData
     */
    async createAdmin(adminData: Partial<User>) {
        const newAdmin = this.userRepository.create(adminData);
        return await this.userRepository.save(newAdmin);
    }



    /**
     * Metodo que sirve para que el admin pueda listar al resto de usuarios
     */
    findAll(){
        return this.userRepository.find();
    }


    /**
     * valida que un email exista
     * @param mail
     */
     async validate(mail:string){
        return await this.userRepository.findOne({where:{mail},
        select:["id","mail","password","role","isValidated","name"]});

     }

    /**
     * actuliza un usuario
     * @param id
     * @param updateData
     */
    async update(id: number, updateData: Partial<User>) {
        await this.userRepository.update(id, updateData);
        return this.userRepository.findOneBy({ id });
    }

    /**
     * borra un usuario
     * @param id
     */
    async remove(id: number) {
        return await this.userRepository.delete(id);
    }

    /**
     * crea un usuario
     * @param createUserDto
     */
    async create(createUserDto: CreateUserDto) {

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);


        const newUser = this.userRepository.create({
            name: createUserDto.name,
            mail: createUserDto.mail,
            password: hashedPassword,
            role: (createUserDto.role as unknown as UserRole) || UserRole.user,
            isValidated: false
        });


        return await this.userRepository.save(newUser);
    }

    /**
     * busca por id un usuario
     * @param id
     */
    async findOne(id: number) {
        const user = await this.userRepository.findOneBy({ id });
        return user;
    }

    /**
     * metodo que busca por email
     * @param mail
     */
    async buscarPorMail(mail:string){
        return await this.userRepository.findOneBy({mail});
    }


    /**
     * activacion de usuario
     * @param id
     */
    async activarUser(id:number){
        const user = await this.userRepository.findOneBy({id});

        if (!user) {
            throw new NotFoundException(`El usuario con el id no existe`);
        }
        user.isValidated = true;
        return await this.userRepository.save(user);



    }



}