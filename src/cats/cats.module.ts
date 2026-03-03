import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Cat} from "./entities/cat.entity";
import {Breed} from "../breeds/entities/breed.entity";
import {HttpModule} from "@nestjs/axios";


@Module({
  imports: [TypeOrmModule.forFeature([Cat,Breed]),
    HttpModule], // para llamar a la API
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
