import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthViewmodel } from './viewmodel/auth.viewmodel';

@Injectable()
export class AuthService {
    constructor(
        // Gerador de tokens
        private jwt: JwtService,
        // acessa variaveis de ambiente
        private config: ConfigService,
    ) { }

    async getToken(sub: string, props?: object): Promise<AuthViewmodel> {
        const payload = { sub, ...props }

        // cria novo token com 1 dia de expiração
        const access_token = await this.jwt.signAsync(payload, {
            expiresIn: '1d',
            secret: (() => {
                return this.config.get<string>('JWT_SECRET')
            })(),
        })

        return {
            access_token,
            expires_in: 86400, // 1 dia
        }
    }
}
