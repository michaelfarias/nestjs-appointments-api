import { Controller, Post, Body, Get, Param, Put, Delete, Query, NotFoundException, Render } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ReturnUserDto } from './dto/return-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendsRepository } from 'src/friends/friends.repository';
import { CommitmentsService } from 'src/commitments/commitments.service';
import { SendgridService } from 'src/sendgrid/sendgrid.service';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        @InjectRepository(FriendsRepository)
        private friendsRepository: FriendsRepository,
        private commitmentsService: CommitmentsService,
        private readonly sendgridService: SendgridService
    ) { }

    @Get('page/')
    @Render('index')
    root(@Query() query) {
        const { name, email } = query;

        return { name, email }
    }

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

    @Post('pre_registration')
    async pre_registration(@Body() createUserDto: CreateUserDto) {
        const { name, email } = createUserDto;

        const mail = {
            to: `${email}`,
            from: 'noreply@application.com',
            subject: 'Complete Your Registration',
            text: 'Click on the link',
            html: `<a href='http://localhost:3000/users/page/pre_registration/?name=${name}&email=${email}'>Finalize registration.</a>`
        };

        await this.sendgridService.send(mail)

        return {
            message: "Foi enviado um email com link para finalizar o cadastro"
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
    async consultUserSchedule(@Param('id') id, @Query('requestedUserId') requestedUserId) {

        const friends = await this.friendsRepository.findFriedship(id, requestedUserId);

        if (friends) {

            const commitments = this.commitmentsService.findCommitmentsByUserId(requestedUserId)

            return commitments;
        }

        throw new NotFoundException('Usuários não possuem amizade.')

    }

}