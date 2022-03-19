import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, BaseEntity, OneToMany } from "typeorm";
import { User } from "src/users/user.entity";

@Entity()
export class Commitment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    // @Column()
    // date: Date;
    // @Column({ type: 'time' })
    // time_only: string;

    // @Column({ type: 'date' })
    // date_only: string;

    @Column()
    date_time: Date;

    @Column()
    description: string;

    @Column()
    place: string;

    @Column({ type: 'timestamp', nullable: true })
    reminder: Date;

    @ManyToOne(Type => User, user => user.commitments)
    user: User;

    @Column("text", { array: true, nullable: true },)
    email_people_involved: string[];
}