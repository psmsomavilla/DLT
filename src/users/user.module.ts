import {Module} from "@nestjs/common";
import {User} from "./entities/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserService} from "./user.service";
import {UserController} from "./user.controller";
import {Verification} from "../verification/entities/verification.entity";
import { SeedServiceTsService } from './seed.service.ts/seed.service.ts.service';

@Module({
    imports: [TypeOrmModule.forFeature([User,Verification])], // vincula la entidad User y verification a nuestra bd para poder verla
    providers: [UserService, SeedServiceTsService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}

