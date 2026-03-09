import {Module} from "@nestjs/common";
import {User} from "./entities/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserService} from "./user.service";
import {UserController} from "./user.controller";


@Module({
    imports: [TypeOrmModule.forFeature([User])], // vincula la entidad User a nuestra bd para poder verla
    providers: [UserService],
    controllers: [UserController],
    exports: [TypeOrmModule,UserService],
})
export class UserModule {}

