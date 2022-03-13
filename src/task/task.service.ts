import { Injectable } from "@nestjs/common";
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from "@nestjs/typeorm";
import { Commitment } from "src/commitments/commitment.entity";
import { CommitmentRepository } from '../commitments/commitments.repository';

@Injectable()
export class TaskService {
    constructor(@InjectRepository(CommitmentRepository)
    private commitmentRepository: CommitmentRepository
    ) { }

    @Cron('*/60 * * * * *')
    async runEveryOneSecond() {
        let date = new Date()
        date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
        date.setSeconds(0)
        date.setMilliseconds(0);
        const commitments = await this.commitmentRepository.findCommitmentByReminder(date);

        this.sendReminder(commitments)
    }

    private async sendReminder(commitments: Commitment[]) {
        commitments.forEach(commitment => {
            const { email_people_involved } = commitment;
            console.log(email_people_involved, commitment)
            console.log('######################################')
        });
    }
}