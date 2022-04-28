import { Injectable } from "@nestjs/common";
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from "@nestjs/typeorm";
import { Commitment } from "src/commitments/commitment.entity";
import { CommitmentRepository } from '../commitments/commitments.repository';
import { SendgridService } from '../sendgrid/sendgrid.service';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(CommitmentRepository)
        private commitmentRepository: CommitmentRepository,
        private readonly sendgridService: SendgridService
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
        commitments.forEach(async (commitment) => {
            const { email_people_involved, description, date_time, place } = commitment;

            const mail = {
                to: email_people_involved,
                from: 'michaelfarias@alu.ufc.br',
                subject: 'REMINDER',
                text: 'Appointment Reminder',
                html: '<body>' +
                    `<h3>Appointment Date: ${date_time}</h3></br>` +
                    `<h3>Appointment Description: ${description}</h3></br>` +
                    `<h3>Place: ${place}</h3></br>` +
                    `<h3>People Involved: ${email_people_involved}</h3></br>` +
                    '</body>'
            };

            await this.sendgridService.send(mail)
        });
    }
}