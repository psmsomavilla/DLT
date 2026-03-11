import {Controller, Delete, Get, Param, Post, Query} from '@nestjs/common';
import {CatsService} from './cats.service';
import {ApiTags} from "@nestjs/swagger";
import {UserRole} from "../users/entities/user.entity";
import {Roles} from "../auth/decorators/roles.decorator";

@ApiTags("cat - Módulo para gestionar datos de gatos")
@Controller('cat')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}


  @Get("fetch")
  async findAll(){
    return await this.catsService.findAll();
  }

  @Post("request")
  @Roles(UserRole.admin)
  async requestMany(@Query("limit") limit:number){
    return this.catsService.bringAndSave(limit);
  }

  @Delete(":id")
  @Roles(UserRole.admin)
  async remove(@Param("id") id:string){
    return this.catsService.remove(+id);
  }


}
