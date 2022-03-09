import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FriendsController } from "./friends.controller";
import { FriendsRepository } from "./friends.repository";
import { FriendsService } from "./friends.service";

@Module({
    imports: [TypeOrmModule.forFeature([FriendsRepository])],
    providers: [FriendsService],
    controllers: [FriendsController]
})
export class FriendsModules { }