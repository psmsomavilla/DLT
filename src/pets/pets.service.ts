import {Injectable, NotFoundException} from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Cat} from "../cats/entities/cat.entity";
import {Pet} from "./entities/pet.entity";
import {Repository} from "typeorm";

@Injectable()
export class PetsService {
  @InjectRepository(Pet)
  private readonly petsRepository: Repository<Pet>;

  @InjectRepository(Cat)
  private readonly catRepository: Repository<Cat>;



  findAll() {
    return this.petsRepository.find({
      relations: ["user","cat"],
    });
  }


  async createPet(userId: number, catId: number,  petName:string) {
    // buscamos el gato en la bd por id
    const cat = await this.catRepository.findOneBy({id: catId});

    if (!cat) {
      throw new NotFoundException("El gato con esa ID no existe");
    }

    const newPet = this.petsRepository.create({
      name: petName,
      user: {id: userId}, // relacion con el dueño
      cat:cat,            // relacion con la entidad cat
    });
    return await this.petsRepository.save(newPet);




  }
}
