import { User } from "../user.entity";
import { Address } from '../address';
import { Commitment } from '../../commitments/commitment.entity';

export class CreateUserDto {
    name: string

    email: string;

    role: string

    telephone: string

    address: Address;

    password: string


    commitments: Commitment[];

    friends: User[]
}