import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRole{
    none = 'none', // usuario no registrado
    user = 'user',
    admin = 'admin',

}

//Creación tabla user
@Entity()
export class user {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true}) // valida que dos personas no puedan tener el mismo email
    email: string;

    @Column()
    password: string;

    @Column({type:"enum", enum: UserRole,default:UserRole.none}) // solo acepta valores del enum,si se crea un usuario sin rol pondrá None
    role: UserRole;

    @Column({default:false}) // cuando el admin valide al user se pondra a true
    isValidated: boolean;



}