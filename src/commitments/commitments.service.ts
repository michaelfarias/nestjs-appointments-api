import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommitmentRepository } from './commitments.repository';
import { CreateCommitmentDto } from './dto/create-commitment.dto';
import { UpdateCommitmentDto } from './dto/update-commitment.dto';
import * as moment from "moment";

@Injectable()
export class CommitmentsService {
    constructor(
        @InjectRepository(CommitmentRepository)
        private commitmentRepository: CommitmentRepository,

    ) { }

    async createCommitment(createCommitmentDto: CreateCommitmentDto) {
        const commitment = this.commitmentRepository.createCommitment(createCommitmentDto)
        return commitment;
    }

    async findCommitment(idUser, from, time_from, to, time_to) {
        return this.commitmentRepository.findCommitment(idUser, from, time_from, to, time_to);
    }

    async findCommitmentById(id: string) {

        return await this.commitmentRepository.findCommitmentById(id);
    }

    async updateCommitment(userId, updateCommitmentDto: UpdateCommitmentDto, id: string) {
        const commitment = await this.findCommitmentById(id);

        const { description, date, time, reminder, email_people_involved, place } = updateCommitmentDto;

        commitment.description = description ? description : commitment.description;
        commitment.place = place ? place : commitment.place;

        commitment.email_people_involved =
            email_people_involved ?
                email_people_involved : commitment.email_people_involved;

        if (date && time) {

            commitment.date_time = new Date(moment(date, 'DD-MM-YYYY', true).format());
            commitment.date_time.setHours(Number.parseInt(time.substr(0, 2)));
            commitment.date_time.setMinutes(Number.parseInt(time.substr(3, 4)));
        }

        if (reminder && (reminder.days_before > 0 || reminder.hours_before > 0)) {

            const new_reminder = new Date(commitment.date_time)
            new_reminder.setDate(new_reminder.getDate() - reminder.days_before);
            new_reminder.setHours(new_reminder.getHours() - reminder.hours_before);
            new_reminder.setSeconds(0)
            new_reminder.setMilliseconds(0)

            commitment.reminder = new_reminder
        }

        try {
            const result = await this.commitmentRepository.updateCommitment(userId, commitment, id)

            if (result.affected === 0) {
                throw new NotFoundException('Não foi possivel atualizar o compromisso com ID informado');
            }

            return commitment;
        } catch (error) {
            throw error;
        }
    }

    async deleteCommitment(userId: number, id: number) {
        const result = await this.commitmentRepository.deleteCommitment(userId, id);

        if (result.affected === 0)
            throw new NotFoundException('Não foi possivel deletar o compromisso com ID informado');
    }

    async findCommitmentsByUserId(userId) {
        return await this.commitmentRepository.findCommitmentsByUserId(userId);
    }
}