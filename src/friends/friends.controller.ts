import { Controller, Put, Param, Body } from "@nestjs/common";
import { FriendsService } from "./friends.service";

@Controller('friends')
export class FriendsController {
    constructor(private friendsService: FriendsService) { }

    @Put('request_friendship/:id')
    async requestFriendship(@Param('id') userIdRequester, @Body() user) {
        const userIdRequested = user.id;
        console.log(userIdRequester, userIdRequested)
        return this.friendsService.createFriendship(userIdRequester, userIdRequested);
    }
}