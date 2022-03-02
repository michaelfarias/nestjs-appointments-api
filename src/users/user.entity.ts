import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    JoinTable,
    ManyToMany
} from 'typeorm';
import { Commitment } from 'src/commitments/commitment.entity';
import { Address } from './address';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    name: string

    @Column({ nullable: false, type: 'varchar', length: 200 })
    email: string;

    @Column()
    role: string

    @Column()
    telephone: string

    @Column(() => Address)
    address: Address;

    @Column()
    password: string

    @OneToMany(type => Commitment, commitment => commitment.user)
    commitments: Commitment[];

    @ManyToMany(type => User)
    @JoinTable()
    friends: User[]
}