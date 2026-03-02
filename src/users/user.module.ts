import {Module} from "@nestjs/common";
import {User} from "./entities/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserService} from "./user.service";
import {UserController} from "./user.controller";

@Module({
    imports: [TypeOrmModule.forFeature([User])], // vincula la entidad User para poder usar la tabla User en la bd
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}

