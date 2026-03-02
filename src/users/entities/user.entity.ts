import { Entity, PrimaryGeneratedColumn, Column ,CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export enum UserRole{
    none = 'none', // usuario no registrado
    user = 'user',
    admin = 'admin',

}

//Creación tabla user
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true}) // valida que dos personas no puedan tener el mismo email
    mail: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column({type:"enum",enum:UserRole,default:UserRole.none}) // solo acepta valores del enum,si se crea un usuario sin rol pondrá None
    role: UserRole;

    @Column({default:"es"})
    language:string;

    @Column({ default: false }) //requisito de validación del admin
    isValidated: boolean;


    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;



}