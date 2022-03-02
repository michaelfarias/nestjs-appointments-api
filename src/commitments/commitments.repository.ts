import { Repository, EntityRepository } from "typeorm";
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
        commitment.date = new Date()
        commitment.place = "Local";
        commitment.email_people_involved = ['alsd@gmail.com', 'laksdla@hotmail.com']
        commitment.user = createCommitmentDto.user;

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

    async findCommitmentById(id: string) {
        const commitment = await this.findOne(id);

        if (commitment === undefined)
            throw new InternalServerErrorException('Compromisso não encontrado')

        return commitment;
    }

    async updateCommitment(updateCommitmentDto: UpdateCommitmentDto) {

        return await this.save(updateCommitmentDto);
    }
}