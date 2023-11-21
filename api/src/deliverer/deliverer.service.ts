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
        // let allDeliverers: Deliverer[]
        // allDeliverers = await this.db.deliverer.findMany({
        //     where: {
        //         active: true
        //     },
        //     orderBy: {
        //         name: 'asc'
        //     }
        // })
        // // chose 3 random in all deliverers array
        // const deliverers: Deliverer[] = []
        // allDeliverers = this.shuffle(allDeliverers)
        // deliverers.push(allDeliverers[0])
        // deliverers.push(allDeliverers[1])
        // deliverers.push(allDeliverers[2])

        // const viewmodel: DelivererViewmodel[] = []
        // for (const d of deliverers) {
        //     viewmodel.push(new DelivererViewmodel(d))
        // }

        return [
            {
                id: 'ea34afd1-2ba8-438d-8c2f-683d69114d56',
                name: 'WE Transportes',
                fare: 32.99,
            },
            {
                id: '72576a59-0070-4055-9a67-a7af28f8cac8',
                name: 'Sedex',
                fare: 21.99,
            },
            {
                id: '985e153e-4654-4e9a-a48c-7b1be2a5d91a',
                name: 'Correios',
                fare: 20.99,
            }
        ]
    }
}
