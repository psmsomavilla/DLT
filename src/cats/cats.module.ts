import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import {HttpModule} from "@nestjs/axios";
import * as process from "node:process";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Cat} from "./entities/cat.entity";
import {Breed} from "../breeds/entities/breed.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Cat,Breed]),HttpModule.register({timeout:7000,headers:{"api_key":process.env.theCatApiKey,}})],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
