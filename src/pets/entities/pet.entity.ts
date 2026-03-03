import {Column, Entity, ManyToOne, PrimaryGeneratedColumn,JoinColumn} from "typeorm";
import {Cat} from "../../cats/entities/cat.entity";
import {User} from "../../users/entities/user.entity";

@Entity()
export class Pet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Cat, (cat) => cat.id)
    @JoinColumn({ name: 'catId' })
    cat: Cat;



}
