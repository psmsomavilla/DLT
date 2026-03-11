import {Controller, Delete, Get, Param, Post, Query, UseGuards} from '@nestjs/common';
import {CatsService} from './cats.service';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {UserRole} from "../users/entities/user.entity";
import {Roles} from "../auth/decorators/roles.decorator";
import {RolesGuard} from "../auth/guards/roles.guard";
import {AuthGuard} from "@nestjs/passport";

@ApiTags("cat - Módulo para gestionar datos de gatos")
@ApiBearerAuth()
@UseGuards(AuthGuard,RolesGuard)
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
