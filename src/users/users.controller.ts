import { Controller, Post, Body, Get, Param, Put, Delete, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ReturnUserDto } from './dto/return-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendsRepository } from 'src/friends/friends.repository';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        @InjectRepository(FriendsRepository)
        private friendsRepository: FriendsRepository
    ) { }
    @Post('admin')
    async createAdminUser(
        @Body() createUserDto: CreateUserDto,
    ): Promise<ReturnUserDto> {

        const admin = await this.usersService.createAdminUser(createUserDto);
        return {
            user: admin,
            message: 'Administrador cadastrado com sucesso!'
        }
    }

    @Post()
    async createUser(
        @Body() createUser: CreateUserDto,
    ): Promise<ReturnUserDto> {

        const user = await this.usersService.createUser(createUser);

        return {
            user,
            message: 'Usuário cadastrado com sucesso!'
        }
    }

    @Get()
    async findUsers() {
        return this.usersService.findUsers()
    }

    @Get(':id')
    async findUserById(@Param('id') userId) {
        const user = await this.usersService.findUserById(userId);

        return user;
    }

    @Put(':id')
    async updateUser(@Param('id') userId, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(userId, updateUserDto);
    }

    @Delete(':id')
    async deleteUser(@Param('id') userId: string) {
        await this.usersService.deleteUser(userId);

        return {
            message: 'Usuário removido com sucesso.'
        }
    }

    @Get('consult_user_schedule/:id')
    async consultUserSchedule(@Param('id') id, @Query('userId') userId) {

        const friends = await this.friendsRepository.findFriedship(id, userId);

        if (friends) {

        }

        return friends;

    }

}