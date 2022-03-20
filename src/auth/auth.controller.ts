import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post('/signin')
    async signIn(
        @Body() credentialsDto: CredentialsDto
    ): Promise<{ token: string }> {
        return await this.authService.signIn(credentialsDto);
    }
}