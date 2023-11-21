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
                id: 'cdc903f3-cfc8-48ae-a5bf-b822b4b251a4',
                name: 'WE Transportes',
                fare: 32.99,
            },
            {
                id: '05ed9919-4e22-495f-8516-1cc5bed3677b',
                name: 'Sedex',
                fare: 21.99,
            },
            {
                id: '39573920-2b83-43ce-9bad-25638c7b6ee2',
                name: 'Correios',
                fare: 20.99,
            }
        ]
    }
}
