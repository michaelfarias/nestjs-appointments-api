import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from "typeorm";
import { User } from "src/users/user.entity";

@Entity()
export class Commitment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date_time: Date;

    @Column()
    description: string;

    @Column()
    place: string;

    @Column({ type: 'timestamp', nullable: true })
    reminder: Date;

    @ManyToOne(Type => User, user => user.commitments, { nullable: false })
    user: User;

    @Column("text", { array: true, nullable: true },)
    email_people_involved: string[];

    @Column("boolean")
    public: boolean = false

}