import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Friend extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    requestor_id: number;

    @Column({ nullable: true })
    requested_id: number;

}