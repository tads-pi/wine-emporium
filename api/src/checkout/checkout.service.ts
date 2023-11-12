import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CheckoutViewmodel } from './viewmodel/checkout.viewmodel';
import { Checkout } from '@prisma/client';
import { AddressViewmodel } from '../client/address/viewmodel/address.viewmodel';
import { CartService } from '../cart/cart.service';
import { DelivererViewmodel } from '../product/deliverer/viewmodel';
import { SetCheckoutPaymentMethodDTO } from './dto';

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
        const address = await this.db.address.findUnique({
            where: { id: c.addressId || '' }
        })
        const payment = await this.db.payment.findUnique({
            where: { id: c.paymentId || '' }
        })
        const deliverer = await this.db.deliverer.findUnique({
            where: { id: c.delivererId || '' }
        })

        const viewmodel: CheckoutViewmodel = {
            id: c.id,
            sequentialId: c.sequentialId,
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
            price: await this.cartSvc.calculateCartPrice(cart.id) + (deliverer ? deliverer.fare : 0),
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
                    sequentialId: await this.db.checkout.count() + 1,
                }
            })
        }

        return await this.fillCheckoutWithData(checkout)
    }

    async cancelCheckout(clientId: string): Promise<CheckoutViewmodel> {
        const cart = await this.db.cart.findFirst({
            where: { clientId: clientId, status: "OPEN" }
        })
        if (!cart) {
            throw new NotFoundException('Carrinho não encontrado')
        }

        let checkout: Checkout | null = null
        checkout = await this.db.checkout.findFirst({
            where: { cartId: cart.id }
        })
        if (!checkout) {
            throw new NotFoundException('Checkout não encontrado')
        }

        checkout = await this.db.checkout.update({
            where: { id: checkout.id },
            data: { status: "CANCELADO" }
        })

        return await this.fillCheckoutWithData(checkout)
    }

    async finishCheckout(clientId: string): Promise<CheckoutViewmodel> {
        const cart = await this.db.cart.findFirst({
            where: { clientId: clientId, status: "OPEN" }
        })
        if (!cart) {
            throw new NotFoundException('Carrinho não encontrado')
        }

        let checkout: Checkout | null = null
        checkout = await this.db.checkout.findFirst({
            where: { cartId: cart.id }
        })
        if (!checkout) {
            throw new NotFoundException('Checkout não encontrado')
        }

        if (!checkout.addressId) {
            throw new NotFoundException('Endereço não encontrado')
        }

        if (!checkout.paymentId) {
            throw new NotFoundException('Método de pagamento não encontrado')
        }

        if (!checkout.delivererId) {
            throw new NotFoundException('Entregador não encontrado')
        }

        checkout = await this.db.checkout.update({
            where: { id: checkout.id },
            data: { status: "PAGAMENTO_PENDENTE" }
        })

        return await this.fillCheckoutWithData(checkout)
    }

    async setCheckoutAddress(clientId: string, checkoutId: string, addressId: string): Promise<CheckoutViewmodel> {
        let c: Checkout | null = null
        c = await this.db.checkout.findUnique({
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

        c = await this.db.checkout.update({
            where: { id: checkoutId },
            data: {
                addressId: addressId,
                status: "ENTREGADOR_PENDENTE",
            },
        });

        return this.fillCheckoutWithData(c);
    }

    async setCheckoutDeliverer(clientId: string, checkoutId: string, delivererId: string): Promise<CheckoutViewmodel> {
        let c: Checkout | null = null
        c = await this.db.checkout.findUnique({
            where: { id: checkoutId },
        });
        if (!c) {
            throw new NotFoundException('Checkout não encontrado');
        }
        const e = await this.db.deliverer.findUnique({
            where: { id: delivererId },
        });
        if (!e) {
            throw new NotFoundException('Entregador não encontrado');
        }

        c = await this.db.checkout.update({
            where: { id: checkoutId },
            data: {
                delivererId: delivererId,
                status: "METODO_DE_PAGAMENTO_PENDENTE"
            },
        });

        return this.fillCheckoutWithData(c);
    }

    async setCheckoutPaymentMethod(clientId: string, checkoutId: string, dto: SetCheckoutPaymentMethodDTO): Promise<null> {
        let c: Checkout | null = null
        c = await this.db.checkout.findUnique({ where: { id: checkoutId } })
        if (!c) {
            throw new NotFoundException('Checkout não encontrado')
        }

        if (dto.paymentMethod === 'credit-card') {
            await this.handleCreditCardPaymentMethod(clientId, dto.methodId)
        } else if (dto.paymentMethod === 'bank-slip') {
            await this.handleBankSlipPaymentMethod(clientId, dto.methodId)
        } else {
            throw new BadRequestException('Método de pagamento inválido')
        }
        return
    }

    // WORK IN PROGRESS HERE
    private async handleCreditCardPaymentMethod(checkoutId: string, id: string) {
        let c: Checkout | null = null
        c = await this.db.checkout.findUnique({ where: { id: checkoutId } })
        if (!c) {
            throw new NotFoundException('Checkout não encontrado')
        }

        const creditCard = await this.db.creditCard.findUnique({ where: { id: id } })
        if (!creditCard) {
            throw new NotFoundException('Cartão de crédito não encontrado')
        }

        // WIP
        // await this.db.checkout.update({
        //     where: {
        //         id: checkoutId,

        //     }
        // })
    }
    private async handleBankSlipPaymentMethod(checkoutId: string, id: string) { }
}
