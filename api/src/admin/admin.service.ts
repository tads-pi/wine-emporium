import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientBackofficeViewmodel } from './viewmodel';

@Injectable()
export class AdminService {
    constructor(
        private db: PrismaService
    ) { }

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
}
