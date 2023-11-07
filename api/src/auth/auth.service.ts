import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDTO } from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
    constructor(
        private jwt: JwtService,
        private config: ConfigService,
    ) { }

    async getToken(sub: string, props?: object): Promise<AuthDTO> {
        const payload = { sub, ...props }

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
