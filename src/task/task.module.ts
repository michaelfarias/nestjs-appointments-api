import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { CommitmentRepository } from 'src/commitments/commitments.repository';
import { TaskService } from './task.service';
import { SendgridService } from '../sendgrid/sendgrid.service';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        TypeOrmModule.forFeature([CommitmentRepository])],
    providers: [
        TaskService,
        SendgridService
    ],
    controllers: []
})
export class TaskModule { }