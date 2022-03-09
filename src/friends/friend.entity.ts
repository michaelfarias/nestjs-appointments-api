import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Friend extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    requestor_id: number;

    @Column()
    requested_id: number;

}