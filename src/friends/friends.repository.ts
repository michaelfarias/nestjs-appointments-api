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
            throw new InternalServerErrorException('Erro ao salvar o usuário no banco de dados')
        }


    }

    async findFriedship(userIdRequester, userIdRequested) {
        console.log('chamou', userIdRequested, userIdRequester)
        const query = await this.createQueryBuilder('friend')
            .select(['friend.requestor_id', 'friend.requested_id'])
            .where('friend.requestor_id = :id', { id: 1 })
            .andWhere('friend.requested_id = :id', { id: 2})
            .getOne();
        console.log(query)
        return query;
    }
}