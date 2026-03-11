import {Injectable, Logger} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {catchError, firstValueFrom, Observable} from "rxjs";
import {AxiosError} from "axios";
import {Repository} from "typeorm";
import {Cat} from "./entities/cat.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class CatsService {
  private readonly logger = new Logger(CatsService.name);

  constructor(private readonly httpService: HttpService,@InjectRepository(Cat)private readonly catRepository: Repository<Cat>) {}

  async findAll() {

    const { data } = await firstValueFrom(
        this.httpService.get('https://api.thecatapi.com/v1/images/search').pipe(

            catchError((error: AxiosError) => {
              this.logger.error(error.response?.data);
              throw "Error al conectar con la API";
            }),
        ),
    );
      const externalData = data[0];

      const newCat = this.catRepository.create({
          externalId: externalData.id,
          url: externalData.url,
          width: externalData.width,
          height: externalData.height
      });

      await this.catRepository.save(newCat);

    return data;
  }




}



