import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CheckoutViewmodel } from './viewmodel/checkout.viewmodel';
import { Checkout } from '@prisma/client';
import { AddressViewmodel } from '../client/address/viewmodel/address.viewmodel';
import { CartService } from '../cart/cart.service';
import { DelivererViewmodel } from '../product/deliverer/viewmodel';

@Injectable()
export class CheckoutService {
    constructor(
        private db: PrismaService,
        private cartSvc: CartService,
    ) { }

    async fillCheckoutWithData(c: Checkout): Promise<CheckoutViewmodel> {
        const cart = await this.db.cart.findFirst({
            where: { id: c.cartId }
        })
        // Como todos esses caras podem estart nulos, precisamos usar o operador ||
        const address = await this.db.address.findFirst({
            where: { id: c.addressId || '' }
        })
        const payment = await this.db.payment.findFirst({
            where: { id: c.paymentId || '' }
        })
        const deliverer = await this.db.deliverer.findFirst({
            where: { id: c.delivererId || '' }
        })

        const viewmodel: CheckoutViewmodel = {
            id: c.id,
            status: c.status,
            cart: {
                id: cart.id,
                products: await this.cartSvc.getProductsFromCart(cart),
            },
            deliverer: deliverer ? new DelivererViewmodel(deliverer) : null,
            address: address ? new AddressViewmodel(address, false) : null,
            // payment: {
            //     id: payment.id,
            //     cardNumber: payment.cardNumber,
            //     cardName: payment.cardName,
            //     cardExpiration: payment.cardExpiration,
            //     cardCVV: payment.cardCVV,
            // },
            price: await this.cartSvc.getCartPrice(cart.clientId) + (deliverer ? deliverer.fare : 0),
        }

        return viewmodel
    }

    async listCheckout(clientId: string): Promise<CheckoutViewmodel[]> {
        const allCarts = await this.db.cart.findMany({
            where: {
                clientId: clientId,
            }
        })
        const allCheckouts = await this.db.checkout.findMany({
            where: {
                cartId: {
                    in: allCarts.map(c => c.id)
                }
            }
        })

        let viewmodel: CheckoutViewmodel[] = []
        for (const c of allCheckouts) {
            viewmodel.push(await this.fillCheckoutWithData(c))
        }

        return viewmodel
    }

    async getCheckoutById(clientId: string, id: string): Promise<CheckoutViewmodel> {
        const c = await this.db.checkout.findUnique({
            where: { id },
        });
        if (!c) {
            throw new NotFoundException('Checkout não encontrado');
        }

        return await this.fillCheckoutWithData(c)
    }

    async startCheckout(clientId: string): Promise<CheckoutViewmodel> {
        const cart = await this.db.cart.findFirst({
            where: {
                clientId: clientId,
                status: "OPEN"
            }
        })
        if (!cart) {
            throw new NotFoundException('Carrinho não encontrado')
        }

        let checkout: Checkout | null = null
        checkout = await this.db.checkout.findFirst({
            where: { cartId: cart.id }
        })
        if (!checkout) {
            checkout = await this.db.checkout.create({
                data: {
                    cartId: cart.id,
                    status: "ENDERECO_PENDENTE",
                }
            })
        }

        return await this.fillCheckoutWithData(checkout)
    }
}
