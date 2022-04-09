import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommitmentRepository } from './commitments.repository'
import { CommitmentsService } from './commitments.service';
import { CommitmentsController } from './commitments.controller';
import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        TypeOrmModule.forFeature([CommitmentRepository]),
        PassportModule.register({ defaultStrategy: 'jwt' })
    ],
    providers: [CommitmentsService, SendgridService],
    controllers: [CommitmentsController],
})
export class CommitmentsModule { }