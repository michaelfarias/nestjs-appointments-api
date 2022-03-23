import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FriendsRepository } from 'src/friends/friends.repository';
import { CommitmentsService } from 'src/commitments/commitments.service';
import { CommitmentRepository } from 'src/commitments/commitments.repository';
import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository, FriendsRepository, CommitmentRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' })
    ],
    providers: [UsersService, CommitmentsService, SendgridService],
    controllers: [UsersController],
})
export class UsersModule { }