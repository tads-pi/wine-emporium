import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BackofficeClientViewmodel } from './viewmodel';
import { BackofficeClientSignInDTO, SaveBackofficeClientDTO, UpdateBackofficeClientDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthDTO } from '../auth/dto/auth.dto';
import { AuthService } from '../auth/auth.service';
import { BackofficeGroupViewmodel } from './viewmodel/backoffice-group.viewmodel';
@Injectable()
export class AdminService {
    constructor(
        private db: PrismaService,
        private authSvc: AuthService
    ) { }

    async signIn(dto: BackofficeClientSignInDTO): Promise<AuthDTO> {
        const backofficeClient = await this.db.backofficeClient.findUnique({
            where: {
                email: dto.email,
            },
        })
        if (!backofficeClient) {
            throw new NotFoundException('E-mail ou senha incorretos')
        }

        const valid = await bcrypt.compare(dto.password, backofficeClient.password)
        if (!valid) {
            throw new NotFoundException('E-mail ou senha incorretos')
        }

        return this.authSvc.getToken(backofficeClient.id)
    }

    async getAllUsers(): Promise<BackofficeClientViewmodel[]> {
        const users = await this.db.backofficeClient.findMany({
            orderBy: {
                id: 'desc',
            },
        })
        if (users.length === 0) {
            return [];
        }

        const viewmodel: BackofficeClientViewmodel[] = []
        for (const user of users) {
            const group = await this.db.backofficeGroup.findUnique({
                where: {
                    id: user.groupId,
                },
            })

            viewmodel.push({
                id: user.id,
                name: user.name,
                document: user.document,
                email: user.email,
                active: user.active,
                group: group,
            })
        }

        return viewmodel;
    }

    async saveUser(dto: SaveBackofficeClientDTO): Promise<string> {
        const g = await this.db.backofficeGroup.findUnique({ where: { id: dto.groupId } })
        if (!g) {
            throw new NotFoundException('Group not found')
        }
        const e = await this.db.backofficeClient.findUnique({ where: { email: dto.email } })
        if (e) {
            throw new NotFoundException('E-mail já cadastrado')
        }
        const d = await this.db.backofficeClient.findFirst({ where: { document: dto.document } })
        if (d) {
            throw new NotFoundException('Documento já cadastrado')
        }

        const backofficeClient = await this.db.backofficeClient.create({
            data: {
                name: dto.name,
                document: dto.document,
                email: dto.email,
                password: bcrypt.hashSync(dto.password, 10),
                group: {
                    connect: {
                        id: dto.groupId,
                    }
                }
            },
        })

        return backofficeClient.id;
    }

    async updateUser(id: string, dto: UpdateBackofficeClientDTO): Promise<null> {
        const c = this.db.backofficeClient.findUnique({ where: { id } })
        if (!c) {
            throw new NotFoundException('Cliente não encontrado')
        }

        // Gambiarrinha
        const group = dto.group
        if (!(group === 'ADMINISTRADOR' || group === 'ESTOQUISTA')) {
            throw new NotFoundException('Grupo não encontrado')
        }

        const g = await this.db.backofficeGroup.findFirst({
            where: { name: group }
        })
        if (!g) {
            throw new NotFoundException('Grupo não encontrado')
        }
        const d = await this.db.backofficeClient.findFirst(
            {
                where: {
                    document: dto.document,
                    id: {
                        not: id,
                    }
                }
            }
        )
        if (d) {
            throw new NotFoundException('Documento já cadastrado')
        }

        await this.db.backofficeClient.update({
            where: {
                id: id,
            },
            data: {
                name: dto.name,
                document: dto.document,
                group: {
                    connect: {
                        name: group,
                    }
                }
            },
        })

        return null;
    }

    async getUserById(id: string): Promise<BackofficeClientViewmodel> {
        const c = await this.db.backofficeClient.findUnique({
            where: {
                id: id,
            },
        })
        if (!c) {
            throw new NotFoundException('Cliente não encontrado');
        }

        const g = await this.db.backofficeGroup.findUnique({
            where: {
                id: c.groupId,
            },
        })
        if (!g) {
            throw new InternalServerErrorException('Grupo não encontrado');
        }

        return new BackofficeClientViewmodel(c, g);
    }

    async toggleUserActive(id: string): Promise<null> {
        const user = await this.db.backofficeClient.findUnique({
            where: {
                id: id,
            },
        });
        if (!user) {
            throw new NotFoundException('Cliente não encontrado');
        }

        await this.db.backofficeClient.update({
            where: {
                id: id,
            },
            data: {
                active: !user.active,
            },
        })

        return null
    }

    async deleteUser(id: string): Promise<null> {
        await this.db.backofficeClient.delete({
            where: { id: id }
        })
        return null
    }

    async listGroups(): Promise<BackofficeGroupViewmodel[]> {
        const groups = await this.db.backofficeGroup.findMany({
            where: {
                active: true,
            },
        })

        let viewmodel: BackofficeGroupViewmodel[] = []
        for (const g of groups) {
            viewmodel.push(new BackofficeGroupViewmodel(g))
        }

        return viewmodel
    }
}
