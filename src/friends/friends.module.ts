import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FriendsController } from "./friends.controller";
import { FriendsRepository } from "./friends.repository";
import { FriendsService } from "./friends.service";
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [TypeOrmModule.forFeature([FriendsRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' })
    ],
    providers: [FriendsService],
    controllers: [FriendsController]
})
export class FriendsModules { }