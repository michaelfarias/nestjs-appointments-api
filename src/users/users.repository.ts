import { EntityRepository, Repository, getRepository } from 'typeorm';
import { UserRole } from './user-roles.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { FindUsersQueryDto } from './dto/find-users-query.dto';
import { CredentialsDto } from '../auth/dto/credentials.dto';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(
        createUserDto: CreateUserDto,
        role: UserRole
    ): Promise<User> {
        const { name, email, telephone,
            street,
            district,
            code,
            city,
            state,
            number,
            complement
            , password, commitments
        } = createUserDto;

        const user = this.create();
        user.name = name;
        user.email = email;
        user.role = role;
        user.telephone = telephone;
        user.address = {
            street,
            district,
            code,
            city,
            state,
            number,
            complement
        }
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt)
        user.commitments = commitments;

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

    async checkCredentials(credentialsDto: CredentialsDto): Promise<User> {
        const { email, password } = credentialsDto;
        const user = await this.findOne({ email });

        if (user && (await user.checkPassword(password))) {
            return null;
        }
        else {
            return null;
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}