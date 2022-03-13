import { Repository, EntityRepository, Brackets } from "typeorm";
import { InternalServerErrorException } from "@nestjs/common";
import { Commitment } from "./commitment.entity";
import { CreateCommitmentDto } from './dto/create-commitment.dto';
import { UpdateCommitmentDto } from "./dto/update-commitment.dto";

@EntityRepository(Commitment)
export class CommitmentRepository extends Repository<Commitment>{

    async createCommitment(
        createCommitmentDto: CreateCommitmentDto
    ): Promise<Commitment> {
        const commitment = this.create();
        commitment.description = createCommitmentDto.description;
        // commitment.date = new Date();
        commitment.time_only = "16:28:";
        commitment.date_only = "2022-08-03";
        commitment.place = "Local";
        commitment.email_people_involved = ['alsd@gmail.com', 'laksdla@hotmail.com']
        commitment.user = createCommitmentDto.user;
        // console.log(new Date().toLocaleDateString('pt-BR', { timeZone: 'UTC' }))
        const now = new Date()
        now.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
        now.setDate(now.getDate() - createCommitmentDto.reminder.days_before);
        now.setHours(now.getHours() - createCommitmentDto.reminder.hours_before);
        now.setSeconds(0)
        now.setMilliseconds(0)
        commitment.reminder = now

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
        console.log(from, time_from, to, time_to)
        if (from && to) {
            console.log("between")
            return await commitments
                .where('commitment.time_only >= :time_from', { time_from: time_from })
                .andWhere('commitment.date_only >= :date_from', { date_from: from })
                .andWhere('commitment.time_only <= :time_to', { time_to: time_to })
                .andWhere('commitment.date_only <= :date_to', { date_to: to })
                .getMany()
        }

        else if (from && !to) {
            console.log("desde")
            return await commitments
                .where('commitment.time_only >= :time_from', { time_from: time_from })
                .andWhere('commitment.date_only >= :date_from', { date_from: from })
                .getMany();
        }

        else if (to && !from) {
            return await commitments
                .where('commitment.time_only <= :time_to', { time_to: time_to })
                .andWhere('commitment.date_only <= :date_to', { date_to: to })
                .getMany();
        }
        else {

            return await commitments.where('commitment.user.id = :id', { id: userId }).getMany()

        }
    }

    async findCommitmentById(id: string) {
        const commitment = await this.findOne(id);

        if (commitment === undefined)
            throw new InternalServerErrorException('Compromisso não encontrado')

        return commitment;
    }

    async findCommitmentByReminder(reminder) {
        const query = await this.createQueryBuilder('commitment')
            .where('commitment.reminder = :reminder', { reminder }).getMany();

        return query;
    }

    async updateCommitment(updateCommitmentDto: UpdateCommitmentDto) {

        return await this.save(updateCommitmentDto);
    }

    async findCommitmentsByUserId(userId) {
        const commitments = await this.createQueryBuilder('commitment')
            .where('commitment.user.id = :id', { id: userId })
            .getMany();

        return commitments;
    }
}