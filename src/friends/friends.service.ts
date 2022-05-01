import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FriendsRepository } from "./friends.repository";


@Injectable()
export class FriendsService {

    constructor(
        @InjectRepository(FriendsRepository)
        private friendRepository: FriendsRepository
    ) { }

    async createFriendship(userIdRequester, userIdRequested) {
        const friendship = await this.friendRepository.createFriendship(userIdRequester, userIdRequested)

        return {
            friendship,
            message: 'Solicitação de amizade concluída'
        }
    }
}