import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity("breeds")
export class Breed {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    externalId: number;

    @Column()
    name: string;

    @Column()
    temperament: string;

    @Column()
    origin: string

    @Column()
    description: string;

    @Column()
    wikiUrl: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;



}
