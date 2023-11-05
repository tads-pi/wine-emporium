import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AddressService {
    constructor(
        private db: PrismaService
    ) { }

    async setCheckoutAddress(clientId: string, checkoutId: string, addressId: string): Promise<null> {
        const c = await this.db.checkout.findUnique({
            where: { id: checkoutId },
        });
        if (!c) {
            throw new NotFoundException('Checkout não encontrado');
        }
        const a = await this.db.address.findUnique({
            where: { id: addressId },
        });
        if (!a) {
            throw new NotFoundException('Endereço não encontrado');
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
                addressId: addressId,
                status: "ENTREGADOR_PENDENTE",
            },
        });

        return null;
    }
}
