import { Injectable } from '@nestjs/common';
import { BackofficeGroup } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class GroupService {
    constructor(
        private db: PrismaService
    ) { }

    async getAllGroups(): Promise<BackofficeGroup[]> {
        return this.db.backofficeGroup.findMany({
            orderBy: {
                id: 'desc',
            },
        })
    }
}
