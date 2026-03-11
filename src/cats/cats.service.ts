import {Injectable, Logger} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {catchError, firstValueFrom} from "rxjs";
import {AxiosError} from "axios";

@Injectable()
export class CatsService {
  private readonly logger = new Logger(CatsService.name);

  constructor(private readonly httpService: HttpService) {}

  async findAll() {

    const { data } = await firstValueFrom(
        this.httpService.get('https://api.thecatapi.com/v1/images/search').pipe(

            catchError((error: AxiosError) => {
              this.logger.error(error.response?.data);
              throw "Error al conectar con la API";
            }),
        ),
    );


    return data;
  }
}



