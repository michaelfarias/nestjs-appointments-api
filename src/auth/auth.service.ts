import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CredentialsDto } from './dto/credentials.dto';

@Injectable()
export class AuthService {

    constructor() { }

    async signIn(credentialsDto: CredentialsDto) {
        const user = null;

        if (user === null) {
            throw new UnauthorizedException('Credenciais inválidas')
        }

        return { token: "Aqui será o token" }
    }
}