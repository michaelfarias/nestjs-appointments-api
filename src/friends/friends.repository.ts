import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Friend } from "./friend.entity";

@EntityRepository(Friend)
export class FriendsRepository extends Repository<Friend>{

    async createFriendship(userIdRequester, userIdRequested) {

        const friendship = this.create()
        friendship.requested_id = userIdRequested;
        friendship.requestor_id = userIdRequester;

        try {
            await friendship.save();
            return friendship;
        } catch (error) {
            throw new InternalServerErrorException('Erro ao salvar os usuários no banco de dados')
        }


    }

    async findFriedship(userIdRequester, userIdRequested) {

        const query = await this.createQueryBuilder('friend')
            .select(['friend.requestor_id', 'friend.requested_id'])
            .where('friend.requestor_id = :id', { id: userIdRequester })
            .andWhere('friend.requested_id = :idUser', { idUser: userIdRequested })
            .getOne();

        return query;
    }
}