import { Controller, Post, Param, UseGuards } from "@nestjs/common";
import { FriendsService } from "./friends.service";
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/role.decorator'
import { UserRole } from 'src/users/user-roles.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { GetUser } from '../auth/get-user.decorator';

@Controller('friends')
@UseGuards(AuthGuard(), RolesGuard)
export class FriendsController {
    constructor(private friendsService: FriendsService) { }

    @Post('request_friendship/:id')
    @Roles([UserRole.USER])
    async requestFriendship(@Param('id') userIdRequested, @GetUser() user) {
        const userIdRequester = user.id;
        return this.friendsService.createFriendship(userIdRequester, userIdRequested);
    }
}