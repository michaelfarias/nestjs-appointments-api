import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommitmentRepository } from './commitments.repository'
import { CommitmentsService } from './commitments.service';
import { CommitmentsController } from './commitments.controler';
import { SendgridService } from 'src/sendgrid/sendgrid.service';

@Module({
    imports: [TypeOrmModule.forFeature([CommitmentRepository])],
    providers: [CommitmentsService, SendgridService],
    controllers: [CommitmentsController],
})
export class CommitmentsModule { }