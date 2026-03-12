import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Cat} from "../../cats/entities/cat.entity";

@Entity()
export class Breed {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    externalId: string;

    @Column()
    name: string;

    @Column()
    temperament: string;

    @Column()
    origin:string;

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

    @ManyToMany(() => Cat, (cat) => cat.breeds)
    cats: Cat[];







}
