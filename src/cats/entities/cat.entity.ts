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


    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;



}

