import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientBackofficeViewmodel } from './viewmodel';
import { BackofficeClientSignInDTO, SaveBackofficeClientDTO, UpdateBackofficeClientDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthDTO } from 'src/auth/dto/auth.dto';
import { AuthService } from 'src/auth/auth.service';
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

        console.log({
            dtoPassword: dto.password,
            backofficeClientPassword: backofficeClient.password,
        });

        const valid = await bcrypt.compare(dto.password, backofficeClient.password)
        if (!valid) {
            throw new NotFoundException('E-mail ou senha incorretos')
        }

        return this.authSvc.getToken(backofficeClient.id)
    }

    async getAllUsers(): Promise<ClientBackofficeViewmodel[]> {
        const users = await this.db.backofficeClient.findMany({
            orderBy: {
                id: 'desc',
            },
        })
        if (users.length === 0) {
            return [];
        }

        const viewmodel: ClientBackofficeViewmodel[] = []
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

    async saveUser(dto: SaveBackofficeClientDTO): Promise<null> {
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

        await this.db.backofficeClient.create({
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

        return null;
    }

    async updateUser(id: string, dto: UpdateBackofficeClientDTO): Promise<null> {
        const c = this.db.backofficeClient.findUnique({ where: { id } })
        if (!c) {
            throw new NotFoundException('Client not found')
        }
        const g = await this.db.backofficeGroup.findUnique({ where: { id: dto.groupId } })
        if (!g) {
            throw new NotFoundException('Group not found')
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
                        id: dto.groupId,
                    }
                }
            },
        })

        return null;
    }

    async getUserById(id: string): Promise<ClientBackofficeViewmodel> {
        const user = await this.db.backofficeClient.findUnique({
            where: {
                id: id,
            },
        })
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const group = await this.db.backofficeGroup.findUnique({
            where: {
                id: user.groupId,
            },
        })

        return {
            id: user.id,
            name: user.name,
            document: user.document,
            email: user.email,
            active: user.active,
            group: group,
        }
    }

    async toggleUserActive(id: string): Promise<null> {
        const user = await this.db.backofficeClient.findUnique({
            where: {
                id: id,
            },
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        await this.db.backofficeClient.update({
            where: {
                id: id,
            },
            data: {
                active: !user.active,
            },
        })

        return
    }
}
