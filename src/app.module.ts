import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "./auth/auth.module";
import {UserModule} from "./users/user.module";
import { VerificationModule } from './verification/verification.module';





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
      AuthModule,
      UserModule,
      VerificationModule,


  ],
})
export class AppModule {}