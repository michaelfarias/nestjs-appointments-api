import { EntityRepository, Repository } from 'typeorm';
import { UserRole } from './user-roles.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { FindUsersQueryDto } from './dto/find-users-query.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(
        createUserDto: CreateUserDto,
        role: UserRole
    ): Promise<User> {
        const { name, email, telephone, address, password, commitments, friends } = createUserDto;

        const user = this.create();
        user.name = name;
        user.email = email;
        user.role = role;
        user.telephone = telephone;
        user.address = address;
        user.password = password;
        user.commitments = commitments;
        user.friends = friends;

        try {
            await user.save();

            return user;
        } catch (error) {
            if (error.code.toString() === '23505') {
                throw new ConflictException('Endereço de email já está em uso');
            } else {
                throw new InternalServerErrorException(
                    'Erro ao salvar o usuário no banco de dados',
                )
            }
        }
    }

    async findUsers(queryDto: FindUsersQueryDto) {

        const query = this.createQueryBuilder('user')
            .select([
                'user.name',
                'user.email',
                'user.role',
                'user.telephone',

                'user.address.street',
                'user.address.street',
                'user.address.district',
                'user.address.code',
                'user.address.city',
                'user.address.state',
                'user.address.number',
                'user.address.complement'
            ]).getMany();

        return query;
    }

    async findUserById(userId: string) {
        return await this.findOne(userId);
    }

    async updateUser(user: User) {
        return this.save(user);
    }

    async deleteUser(userId: string) {
        const result = await this.delete(userId);

        if (result.affected === 0)
            throw new NotFoundException('Não foi encontrado o usuário com o ID informado');
    }
}