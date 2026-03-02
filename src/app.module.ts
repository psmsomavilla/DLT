import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UserModule} from "./users/user.module"; // convierte nuestro codigo TS en tablas SQL

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
      UserModule, // importamos en module user
  ],
})
export class AppModule {}