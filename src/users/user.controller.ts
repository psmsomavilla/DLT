import {Controller, Get, Param} from "@nestjs/common";
import {UserService} from "./user.service";



@Controller("users")
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


}