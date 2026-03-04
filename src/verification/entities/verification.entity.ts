import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity("verification")
export class Verification {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    targetMail:string;

    @Column()
    verificationToken:string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    language: string;


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;








}
