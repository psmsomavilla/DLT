import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,ManyToMany,JoinTable} from "typeorm";
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


    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;


    @ManyToMany(() =>Breed)
    @JoinTable({name:"cat_breed"}) // esto creara la tabla intermedia
    breeds: Breed[];

}

