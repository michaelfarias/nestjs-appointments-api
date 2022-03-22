import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm';
import { Commitment } from 'src/commitments/commitment.entity';
import { Address } from './address';
import * as bcrypt from 'bcrypt';

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

    @Column({ nullable: false })
    salt: string;

    @OneToMany(type => Commitment, commitment => commitment.user)
    commitments: Commitment[];

    async checkPassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);

        return hash === this.password;
    }
}