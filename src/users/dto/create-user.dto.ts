import { User } from "../user.entity";
import { Commitment } from '../../commitments/commitment.entity';

export class CreateUserDto {
    name: string

    email: string;

    role: string

    telephone: string

    street: string;

    district: string;

    code: string;

    city: string

    state: string;

    number: number;

    complement: string;

    password: string


    commitments: Commitment[];

    friends: User[]
}