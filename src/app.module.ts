import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "./auth/auth.module";
import {UserModule} from "./users/user.module";
import * as process from "node:process";
import {SeedModule} from "./seed/seed.module";
import {ConfigModule} from "@nestjs/config";
import { CatsModule } from './cats/cats.module';
import { BreedModule } from './breed/breed.module';
import { BreedsModule } from './breeds/breeds.module';





/**
 * Corazón de de la aplicación
 */
@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env',
      }),
    TypeOrmModule.forRoot({ // traduce el codigo a sql y al revés
      type: 'postgres',
      host: process.env.dbHost,
      port: Number(process.env.dbPort),
      username: process.env.dbUsername,
      password: process.env.dbPass,
      database: process.env.dbName,
      autoLoadEntities: true,
      synchronize: true,
    }),
      //Módulos
      AuthModule,
      UserModule,
      SeedModule,
      CatsModule,
      BreedModule,
      BreedsModule,

  ],
})
export class AppModule {}