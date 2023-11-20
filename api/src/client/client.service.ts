import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ClientCheckDataViewmodel, ClientViewmodel } from './viewmodels/client.viewmodel';
import { ClientCheckDataDTO, ClientSignInDTO, ClientSignUpDTO, ClientUpdateDTO } from './dto';
import { AuthService } from '../auth/auth.service';
import { AuthViewmodel } from '../auth/viewmodel/auth.viewmodel';
import * as bcrypt from 'bcrypt';
import * as dayjs from 'dayjs';
import { Client } from '@prisma/client';

@Injectable()
export class ClientService {
    constructor(
        private db: PrismaService,
        private authSvc: AuthService
    ) { }

    async signIn(dto: ClientSignInDTO): Promise<AuthViewmodel> {
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

        return this.authSvc.getToken(client.id, {
            name: client.name,
            email: client.email,
        })
    }

    async check(dto: ClientCheckDataDTO): Promise<ClientCheckDataViewmodel[]> {
        const viewmodel: ClientCheckDataViewmodel[] = [
            {
                field: 'email',
                alreadyExists: false
            }, {
                field: 'document',
                alreadyExists: false
            }
        ]

        if (dto.email) {
            const emailAlreadyRegistered = await this.db.client.findUnique({
                where: { email: dto.email },
            })
            if (emailAlreadyRegistered) {
                viewmodel.filter((e) => e.field === 'email')[0].alreadyExists = true
            }
        }

        if (dto.document) {
            const cpfAlreadyRegistered = await this.db.client.findUnique({
                where: { document: dto.document },
            })
            if (cpfAlreadyRegistered) {
                viewmodel.filter((e) => e.field === 'document')[0].alreadyExists = true
            }
        }

        return viewmodel
    }

    async signUp(dto: ClientSignUpDTO): Promise<AuthViewmodel> {
        const emailAlreadyRegistered = await this.db.client.findUnique({
            where: { email: dto.email },
        })
        if (emailAlreadyRegistered) {
            throw new BadRequestException('E-mail já cadastrados')
        }

        const cpfAlreadyRegistered = await this.db.client.findUnique({
            where: { document: dto.document },
        })
        if (cpfAlreadyRegistered) {
            throw new BadRequestException('CPF já cadastrados')
        }

        const gender = await this.db.gender.findUnique({ where: { id: dto.genderId } })
        if (!gender) {
            throw new BadRequestException('Gênero inválido')
        }

        const c = await this.db.client.create({
            data: {
                email: dto.email,
                name: dto.name,
                password: bcrypt.hashSync(dto.password, 10),
                birthDate: dayjs(dto.birth_date).format('YYYY-MM-DDTHH:mm:ssz'),
                document: dto.document,
                genderId: gender.id,
            },
        })

        return this.authSvc.getToken(c.id)
    }

    async update(clientId: string, dto: ClientUpdateDTO): Promise<ClientViewmodel> {
        let client: Client | null
        client = await this.db.client.findUnique({ where: { id: clientId } })
        if (!client) {
            throw new BadRequestException('Cliente não encontrado')
        }

        if (dto.name) {
            client.name = dto.name
        }
        if (dto.birthDate) {
            client.birthDate = new Date(dayjs(dto.birthDate).format('YYYY-MM-DDTHH:mm:ssz'))
        }
        if (dto.genderId) {
            const gender = await this.db.gender.findUnique({ where: { id: dto.genderId } })
            if (!gender) {
                throw new BadRequestException('Gênero inválido')
            }
            client.genderId = dto.genderId
        }

        client = await this.db.client.update({
            where: { id: clientId },
            data: client
        })

        return new ClientViewmodel(client)
    }

    async getMe(id: string): Promise<ClientViewmodel> {
        return new ClientViewmodel(
            await this.db.client.findUnique({
                where: {
                    id
                }
            })
        );
    }
}
