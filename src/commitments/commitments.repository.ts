import { Repository, EntityRepository } from "typeorm";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Commitment } from "./commitment.entity";
import { CreateCommitmentDto } from './dto/create-commitment.dto';
import * as moment from "moment";

@EntityRepository(Commitment)
export class CommitmentRepository extends Repository<Commitment>{

    async createCommitment(
        createCommitmentDto: CreateCommitmentDto
    ): Promise<Commitment> {
        const commitment = this.create();
        commitment.description = createCommitmentDto.description;
        commitment.user = createCommitmentDto.user;
        commitment.place = createCommitmentDto.place;
        commitment.email_people_involved = createCommitmentDto.email_people_involved

        commitment.date_time = new Date(moment(createCommitmentDto.date, 'DD-MM-YYYY', true).format());
        commitment.date_time.setHours(Number.parseInt(createCommitmentDto.time.substr(0, 2)));
        commitment.date_time.setMinutes(Number.parseInt(createCommitmentDto.time.substr(3, 4)));

        if (createCommitmentDto.reminder.days_before > 0
            ||
            createCommitmentDto.reminder.hours_before > 0) {

            const reminder = new Date(commitment.date_time)
            reminder.setDate(reminder.getDate() - createCommitmentDto.reminder.days_before);
            reminder.setHours(reminder.getHours() - createCommitmentDto.reminder.hours_before);
            reminder.setSeconds(0)
            reminder.setMilliseconds(0)

            commitment.reminder = reminder
        }

        try {
            await commitment.save();

            return commitment;
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException(
                'Erro ao salvar compromisso no banco de dados'
            )
        }
    }

    async findCommitment(userId, from, time_from, to, time_to) {

        const commitments = this.createQueryBuilder("commitment")

        if (from && to) {
            console.log("between")

            const date_time_from = new Date(moment(from.concat(' ', time_from), 'DD-MM-YYYY HH:mm', true).format())
            const date_time_to = new Date(moment(to.concat(' ', time_to), 'DD-MM-YYYY HH:mm', true).format())

            return await commitments
                .where('commitment.date_time BETWEEN :date_time_from AND :date_time_to', { date_time_from, date_time_to })
                .andWhere('commitment.user.id = :id', { id: userId })
                .getMany()
        }

        else if (from && !to) {
            console.log("desde")
            const date_time = new Date(moment(from.concat(' ', time_from), 'DD-MM-YYYY HH:mm', true).format())

            return await commitments
                .where('commitment.date_time >= :date_time', { date_time })
                .andWhere('commitment.user.id = :id', { id: userId })
                .getMany();
        }

        else if (to && !from) {

            const date_time = new Date(moment(to.concat(' ', time_to), 'DD-MM-YYYY HH:mm', true).format())

            return await commitments
                .where('commitment.date_time <= :date_time', { date_time })
                .andWhere('commitment.user.id = :id', { id: userId })
                .getMany();
        }
        else {
            return await commitments.where('commitment.user.id = :id', { id: userId }).getMany()
        }
    }

    async findCommitmentById(id: string) {
        const commitment = await this.findOne(id);

        if (commitment === undefined)
            throw new NotFoundException('Compromisso não encontrado')

        return commitment;
    }

    async findCommitmentByReminder(reminder) {
        const query = await this.createQueryBuilder('commitment')
            .where('commitment.reminder = :reminder', { reminder }).getMany();

        return query;
    }

    async updateCommitment(userId, commitment: Commitment, id) {
        return await this.createQueryBuilder()
            .update(Commitment)
            .set(commitment)
            .where('userId = :userId', { userId })
            .andWhere('id = :id', { id })
            .execute()
    }

    async findCommitmentsByUserId(userId) {
        const commitments = await this.createQueryBuilder('commitment')
            .where('commitment.user.id = :id', { id: userId })
            .getMany();

        return commitments;
    }

    async deleteCommitment(userId: number, id: number) {
        return await this.createQueryBuilder()
            .delete()
            .from(Commitment)
            .where('id = :id ', { id })
            .andWhere('userId = :userId', { userId })
            .execute();
    }
}