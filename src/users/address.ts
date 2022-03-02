import { Column, Entity } from "typeorm";

@Entity()
export class Address {

    @Column()
    street: string;

    @Column()
    district: string;

    @Column()
    code: string;

    @Column()
    city: string

    @Column()
    state: string;

    @Column()
    number: number;

    @Column()
    complement: string;
}