import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "./users/user.module";
import {CatsModule} from "./cats/cats.module";
import { BreedsModule } from './breeds/breeds.module';
import { PetsModule } from './pets/pets.module';
import { AuthModule } from './auth/auth.module';


/**
 * Corazón de de la aplicación
 */
@Module({
  imports: [
    TypeOrmModule.forRoot({ // traduce el codigo a sql y al revés
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: '1234',
      database: 'cats_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
      //Módulos
      UserModule,
      CatsModule,
      BreedsModule,
      PetsModule,
      AuthModule,
  ],
})
export class AppModule {}