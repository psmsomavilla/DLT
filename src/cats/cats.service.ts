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

  async bringAndSave(limit: number) {

    const { data } = await firstValueFrom(
        this.httpService.get(`https://api.thecatapi.com/v1/images/search?limit=${limit}`).pipe(

            catchError((error: AxiosError) => {
              this.logger.error(error.response?.data);
              throw "Error al conectar con la API";
            }),
        ),
    );

      const newCat = data.map(cat => this.catRepository.create({
          externalId: cat.id,
          url: cat.url,
          width: cat.width,
          height: cat.height
      }));

      return await this.catRepository.save(newCat);


  }

    async remove(id: number) {
        return await this.catRepository.softDelete(id);
    }

    async findAll() {
        return await this.catRepository.find();
    }




}



