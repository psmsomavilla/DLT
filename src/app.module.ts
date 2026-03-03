import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "./users/user.module";
import {CatsModule} from "./cats/cats.module";
import { BreedsModule } from './breeds/breeds.module';
import { PetsModule } from './pets/pets.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: '1234',
      database: 'cats_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
      UserModule,
      CatsModule,
      BreedsModule,
      PetsModule,
  ],
})
export class AppModule {}