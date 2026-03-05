import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {UserService} from "./user.service";
import {User} from "./entities/user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
;



@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    /**
     * devuelve todos los usuarios
     */
    @Get()
    findAll(){
        return this.userService.findAll();
    }

    /**
     * busca un usuario por email
     * @param email
     */
    @Get('email/:email')
    async findOneByEmail(@Param('email') email: string) {
        return await this.userService.validate(email);
    }

    /**
     * Crear usuario
     * @param createUserDto
     */
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }


    /**
     * Busca un usuario por su ID
     */
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.userService.findOne(+id);
    }


    /**
     * editar usuario
     * @param id
     * @param updateData
     */
    @Put(':id')
    async update(@Param('id') id: string,@Body()updateData:UpdateUserDto) {
        return await  this.userService.update(+id,updateData as Partial<User>);
    }

    /**
     * borra un usuario
     * @param id
     */
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await  this.userService.remove(+id);
    }




}