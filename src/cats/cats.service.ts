import {Breed} from "../breeds/entities/breed.entity";
import {HttpService} from "@nestjs/axios";
import {InjectRepository} from "@nestjs/typeorm";
import {Cat} from "./entities/cat.entity";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";



@Injectable()
export class CatsService{

constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>, // permiso para guardar en la bd gatos

    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>, // permiso apra guardar razas

    private readonly httpService: HttpService,
) {}

    async findAll() {
        return await this.catRepository.find({
            relations: ['breed'],
        });
    }







}