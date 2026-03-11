import {Controller, Get} from '@nestjs/common';
import { CatsService } from './cats.service';
import {ApiTags} from "@nestjs/swagger";

@ApiTags("cat - Módulo para gestionar datos de gatos")
@Controller('cat')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}


  @Get("fetch")
  async findAll(){
    return await this.catsService.findAll();
  }
}
