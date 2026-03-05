import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "./auth/auth.module";
import {UserModule} from "./users/user.module";
import { SeedModule } from './seed/seed.module';
import * as process from "node:process";





/**
 * Corazón de de la aplicación
 */
@Module({
  imports: [
    TypeOrmModule.forRoot({ // traduce el codigo a sql y al revés
      type: 'postgres',
      host: process.env.dbHost,
      port: Number(process.env.dbPort),
      username: process.env.dbUsername,
      password: process.env.dbPass,
      database: process.env.dbDatabase,
      autoLoadEntities: true,
      synchronize: true,
    }),
      //Módulos
      AuthModule,
      UserModule,
      SeedModule,


  ],
})
export class AppModule {}