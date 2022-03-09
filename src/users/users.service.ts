import { Injectable, InternalServerErrorException, UnprocessableEntityException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRole } from './user-roles.enum';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) { }

    async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
        // if (createUserDto.password != createUserDto.passwordConfirmation) {
        //     throw new UnprocessableEntityException('As senha não conferem');
        // } else {
        return this.userRepository.createUser(createUserDto, UserRole.ADMIN);
        // }
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return this.userRepository.createUser(createUserDto, UserRole.USER);
    }

    async findUsers() {
        return this.userRepository.findUsers(null);
    }

    async findUserById(userId: string) {
        return await this.userRepository.findUserById(userId);
    }

    async updateUser(userId: string, updateUserDto: UpdateUserDto) {

        const { name, email, telephone, password, address } = updateUserDto;

        const user = await this.findUserById(userId);
        user.name = name ? name : user.name;
        user.email = email ? email : user.email;
        user.telephone = telephone ? telephone : user.telephone;
        user.password = password ? password : user.password;
        user.address = address ? address : user.address;

        try {
            await user.save();
            return user;
        }
        catch (error) {
            throw new InternalServerErrorException('Erro ao salvar os dados no banco de dados');
        }

    }

    async deleteUser(userId: string) {
        await this.userRepository.deleteUser(userId);
    }

    async requestFriendship(userIdRequester, userIdRequested) {
        this.userRepository.requestFriendship(userIdRequester, userIdRequested)

        return {
            message: 'Solicitação de amizade concluída'
        }
    }
}