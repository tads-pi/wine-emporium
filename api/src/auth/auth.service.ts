import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientSignInDTO, ClientSignUpDTO } from './dto/client.dto';
import { BackofficeClientSignInDTO, BackofficeClientSignUpDTO } from './dto';
import { JwtService } from '@nestjs/jwt';
import { AuthDTO } from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as dayjs from 'dayjs';

@Injectable()
export class AuthService {
    constructor(
        private db: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
    ) { }

    async clientSignIn(dto: ClientSignInDTO): Promise<AuthDTO> {
        const client = await this.db.client.findUnique({
            where: {
                email: dto.email,
            },
        })
        if (!client) {
            throw new NotFoundException('E-mail ou senha incorretos')
        }

        const valid = await bcrypt.compare(dto.password, client.password)
        if (!valid) {
            throw new NotFoundException('E-mail ou senha incorretos')
        }

        return this.getToken(client.id, {
            name: client.name,
            email: client.email,
        })
    }

    async clientSignUp(dto: ClientSignUpDTO): Promise<null> {
        const alreadyRegistered = await this.db.backofficeClient.findUnique({
            where: {
                email: dto.email,
                OR: [
                    {
                        document: dto.document,
                    }
                ]
            },
        })
        if (alreadyRegistered) {
            throw new BadRequestException('E-mail ou CPF já cadastrados')
        }

        await this.db.client.create({
            data: {
                email: dto.email,
                name: dto.name,
                password: bcrypt.hashSync(dto.password, 10),
                birthDate: dayjs(dto.birth_date).format('YYYY-MM-DDTHH:mm:ssz'),
                document: dto.document,
                genderId: dto.genderId,
            },
        })

        return null
    }

    async backofficeClientSignIn(dto: BackofficeClientSignInDTO): Promise<AuthDTO> {
        const backofficeClient = await this.db.backofficeClient.findUnique({
            where: {
                email: dto.email,
            },
        })
        if (!backofficeClient) {
            throw new NotFoundException('E-mail ou senha incorretos')
        }

        console.log({
            dtoPassword: dto.password,
            backofficeClientPassword: backofficeClient.password,
        });

        const valid = await bcrypt.compare(dto.password, backofficeClient.password)
        if (!valid) {
            throw new NotFoundException('E-mail ou senha incorretos')
        }

        return this.getToken(backofficeClient.id)
    }

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
