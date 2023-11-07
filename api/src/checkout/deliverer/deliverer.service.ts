import { Injectable, NotFoundException } from '@nestjs/common';
import { Deliverer } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { DelivererViewmodel } from '../../product/deliverer/viewmodel';

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

    async listDeliverers(clientId: string, checkoutId: string): Promise<DelivererViewmodel[]> {
        const c = await this.db.checkout.findUnique({
            where: { id: checkoutId },
        });
        const cart = await this.db.cart.findFirst({
            where: {
                clientId: clientId,
                status: "OPEN"
            }
        })
        if (!c) {
            throw new NotFoundException('Checkout não encontrado');
        }
        if (!cart) {
            throw new NotFoundException('Carrinho não encontrado');
        }

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

    async setCheckoutDeliverer(clientId: string, checkoutId: string, delivererId: string): Promise<null> {
        const c = await this.db.checkout.findUnique({
            where: { id: checkoutId },
        });
        if (!c) {
            throw new NotFoundException('Checkout não encontrado');
        }
        const a = await this.db.deliverer.findUnique({
            where: { id: delivererId },
        });
        if (!a) {
            throw new NotFoundException('Entregador não encontrado');
        }
        const cart = await this.db.cart.findMany({
            where: {
                clientId: clientId,
                status: "OPEN"
            }
        })
        if (cart.length > 1) {
            throw new NotFoundException('Mais de um carrinho aberto');
        }
        const validCart = cart[0].id == c.cartId
        if (!validCart) {
            throw new NotFoundException('Carrinho não encontrado');
        }

        await this.db.checkout.update({
            where: { id: checkoutId },
            data: {
                delivererId: delivererId,
                status: "METODO_DE_PAGAMENTO_PENDENTE"
            },
        });

        return null;
    }
}
