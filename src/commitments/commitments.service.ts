import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommitmentRepository } from './commitments.repository';
import { CreateCommitmentDto } from './dto/create-commitment.dto';
import { UpdateCommitmentDto } from './dto/update-commitment.dto';

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

    async updateCommitment(updateCommitmentDto: UpdateCommitmentDto, id: string) {
        const commitment = await this.findCommitmentById(id);

        const { description, date, email_people_involved, place } = updateCommitmentDto;

        commitment.description = description ? description : commitment.description;
        commitment.time_only = date ? "16:28:21.45" : commitment.time_only;
        commitment.date_only = date ? "05-03-2022" : commitment.date_only;
        commitment.email_people_involved =
            email_people_involved ?
                email_people_involved : commitment.email_people_involved;
        commitment.place = place ? place : commitment.place;

        try {
            commitment.save()
            return commitment;
        } catch (error) {
            throw new InternalServerErrorException('Erro ao atualizar os dados');
        }

    }

    async deleteCommitment(id: string) {
        const result = await this.commitmentRepository.delete(id);

        if (result.affected === 0)
            throw new NotFoundException('Não foi possivel deletar o compromisso com ID informado');
    }


    async findCommitmentsByUserId(userId) {
        return await this.commitmentRepository.findCommitmentsByUserId(userId);
    }
}