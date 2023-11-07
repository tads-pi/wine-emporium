import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DelivererViewmodel } from './viewmodel';
import { Deliverer } from '@prisma/client';
import { ProductDelivererDTO } from './dto/product-deliverer.dto';

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

    async listDeliverers(dto: ProductDelivererDTO): Promise<DelivererViewmodel[]> {
        let allDeliverers: Deliverer[]
        allDeliverers = await this.db.deliverer.findMany()
        // chose 3 random in all deliverers array
        const deliverers: Deliverer[] = []
        allDeliverers = this.shuffle(allDeliverers)
        deliverers.push(allDeliverers[0])
        deliverers.push(allDeliverers[1])
        deliverers.push(allDeliverers[2])

        const viewmodel: DelivererViewmodel[] = []
        for (const d of deliverers) {
            viewmodel.push(new DelivererViewmodel(d))
        }

        return viewmodel
    }
}
