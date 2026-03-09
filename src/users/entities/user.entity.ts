import { Entity, PrimaryGeneratedColumn, Column ,CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export enum UserRole{
    user = 'user',
    admin = 'admin',

}

//Creación tabla user
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column( {unique:true, nullable: false}) // valida que dos personas no puedan tener el mismo email
    mail: string;

    @Column()
    name: string;

    @Column({nullable:false})
    password: string;

    @Column({enum:UserRole,default:UserRole.user}) // solo acepta valores del enum,si se crea un usuario sin rol pondrá None
    role: UserRole;

    @Column({default:"es"})
    language:string;

    @Column({type:"boolean", default: false }) //requisito de validación del admin
    isValidated: boolean;

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