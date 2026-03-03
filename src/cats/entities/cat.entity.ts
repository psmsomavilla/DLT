import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,ManyToOne} from "typeorm";
import {Breed} from "../../breeds/entities/breed.entity";

@Entity()
export class Cat {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    externalId: string;

    @Column()
    url: string;

    @Column()
    width:number;

    @Column()
    height:number;


    //fecha creación
    @CreateDateColumn()
    created_at: Date;

    //update automático
    @UpdateDateColumn()
    updated_at: Date;

    //guarda fecha de borrado
    @DeleteDateColumn()
    deleted_at: Date;


    @ManyToOne(() => Breed, (breed) => breed.cats)
    breed: Breed;


}
