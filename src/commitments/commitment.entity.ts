import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, BaseEntity, OneToMany } from "typeorm";
import { User } from "src/users/user.entity";

@Entity()
export class Commitment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    description: string;

    @Column()
    place: string;

    @ManyToOne(Type => User, user => user.commitments)
    user: User;

    @Column("text", { array: true, nullable: true },)
    email_people_involved: string[];
}