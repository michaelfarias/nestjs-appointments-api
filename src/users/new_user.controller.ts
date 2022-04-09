import { Controller, Body, Get, Post, Query, Render } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { ReturnUserDto } from './dto/return-user.dto';
import { UsersService } from './users.service'

@Controller('new_user')
export class NewUserController {
    constructor(
        private usersService: UsersService
    ) { }

    @Get('page/')
    @Render('index')
    root(@Query() query) {
        const { name, email } = query;

        return { name, email }
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
}