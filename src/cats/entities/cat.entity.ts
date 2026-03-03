import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

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

    @Column()
    breed : string;


    //fecha creación
    @CreateDateColumn()
    created_at: Date;

    //update automático
    @UpdateDateColumn()
    updated_at: Date;

    //guarda fecha de borrado
    @DeleteDateColumn()
    deleted_at: Date;




}
