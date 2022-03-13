import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { CommitmentRepository } from 'src/commitments/commitments.repository';
import { CommitmentsService } from 'src/commitments/commitments.service';
import { TaskService } from './task.service';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        TypeOrmModule.forFeature([CommitmentRepository])],
    providers: [
        TaskService],
    controllers: []
})
export class TaskModule { }