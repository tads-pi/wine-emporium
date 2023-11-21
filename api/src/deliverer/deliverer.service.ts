import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DelivererViewmodel } from './viewmodel';
import { Deliverer } from '@prisma/client';

@Injectable()
export class DelivererService {
    constructor(
        private db: PrismaService
    ) { }

    shuffle(array: Deliverer[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    async listDeliverers(): Promise<DelivererViewmodel[]> {
        const deliverers = await this.db.deliverer.findMany({
            where: { active: true, name: { in: ['WE Transportes', 'Sedex', 'Correios'] } },
            orderBy: { name: 'asc' },
            take: 3,
        })
        const viewmodel: DelivererViewmodel[] = []
        for (const d of deliverers) {
            viewmodel.push(new DelivererViewmodel(d))
        }
        return viewmodel
    }
}
