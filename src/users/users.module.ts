import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FriendsRepository } from 'src/friends/friends.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository, FriendsRepository])],
    providers: [UsersService],
    controllers: [UsersController],
})
export class UsersModule { }