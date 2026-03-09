import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("verification")
export class Verification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    targetEmail: string;

    @Column()
    verificationToken: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    password: string;

    @Column({ type: 'date', nullable: true })
    acceptedAt: Date;

    @CreateDateColumn()
    createdAt: Date;
}