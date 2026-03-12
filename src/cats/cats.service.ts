import {Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {firstValueFrom} from "rxjs";
import {Repository} from "typeorm";
import {Cat} from "./entities/cat.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Breed} from "../breeds/entities/breed.entity";
import * as process from "node:process";

@Injectable()
export class CatsService {

    constructor(private readonly httpService: HttpService,
                @InjectRepository(Cat) private readonly catRepository: Repository<Cat>,
                @InjectRepository(Breed) private readonly breedsRepository: Repository<Breed>,) {
    }

    async bringAndSave(limit: number) {
        const apikey = process.env.theCatApiKey
        const url = `https://api.thecatapi.com/v1/images/search?limit=${limit}&has_breeds=1`;


        const {data} = await firstValueFrom(
            this.httpService.get(url, {headers: {"x-api-key": apikey}}));


        for (const catData of data) {
            const breedEntities: Breed[] = [];

            // buscamos si la raza existe por su id
            if (catData.breeds) {
                for (const b of catData.breeds) {
                    let breed = await this.breedsRepository.findOneBy({externalId: b.id});

                    if (!breed) {
                        // si la raza no existe la creamos
                        breed = this.breedsRepository.create({
                            externalId: b.id,
                            name: b.name,
                            temperament: b.temperament,
                            origin: b.origin,
                            description: b.description,
                            wikiUrl: b.wikipedia_url,
                        });
                        await this.breedsRepository.save(breed);
                    }
                    breedEntities.push(breed);
                }
            }
            //guardamos el gato con su raza
            const cat = this.catRepository.create({
                externalId: catData.id,
                url: catData.url,
                width: catData.width,
                height: catData.height,
                breeds: breedEntities,
            });

            await this.catRepository.save(cat);
        }


    }

    async remove(id: number) {
        return await this.catRepository.softDelete(id);
    }

    async findAll() {
        return await this.catRepository.find({
            relations: {breeds: true}
        });
    }


}



