import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Pet} from "./entities/pet.entity";
import {Cat} from "../cats/entities/cat.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Pet,Cat])],
  controllers: [PetsController],
  providers: [PetsService],
  exports: [PetsService],
})
export class PetsModule {}
