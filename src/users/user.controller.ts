import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";


@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {
    }

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


    @Post("register")
    async register(@Body() createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto);
    }
}