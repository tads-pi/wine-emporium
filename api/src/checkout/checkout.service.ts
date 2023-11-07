import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CheckoutViewmodel } from './viewmodel/checkout.viewmodel';
import { BankSlipPaymentMethod, Checkout, CreditCardPaymentMethod } from '@prisma/client';
import { AddressViewmodel } from '../client/address/viewmodel/address.viewmodel';
import { CartService } from '../cart/cart.service';
import { DelivererViewmodel } from '../product/deliverer/viewmodel';
import { ClientCreditCardViewmodel } from 'src/payment/credit-card/viewmodel/client-credit-card.viewmodel';
import { CheckoutPaymentViewmodel } from './viewmodel/checkout.payment.viewmodel';

@Injectable()
export class CheckoutService {
    constructor(
        private db: PrismaService,
        private cartSvc: CartService,
    ) { }

    private async handlePaymentData(payment: any): Promise<CheckoutPaymentViewmodel> {
        const method = await this.db.paymentMethod.findUnique({
            where: { id: payment.methodId }
        })
        switch (method.name) {
            case 'CARTAO_DE_CREDITO':
                const creditCardPayment = await this.db.creditCardPaymentMethod.findUnique({ where: { id: payment.methodExternalId } })
                const creditCard = await this.db.creditCard.findUnique({ where: { id: creditCardPayment.creditCardId } })
                return {
                    id: creditCardPayment.id,
                    method: 'credit-card',
                    installments: creditCardPayment.installments,
                    installmentsValue: creditCardPayment.installmentsValue,
                    dueDate: creditCardPayment.dueDate,
                    creditCard: new ClientCreditCardViewmodel(creditCard)
                }
            case 'BOLETO':
                const bankSlipPayment = await this.db.bankSlipPaymentMethod.findUnique({
                    where: { id: payment.methodExternalId }
                })
                return {
                    id: bankSlipPayment.id,
                    method: 'bank-slip',
                    installments: bankSlipPayment.installments,
                    installmentsValue: bankSlipPayment.installmentsValue,
                    dueDate: bankSlipPayment.dueDate,
                    creditCard: null
                }
            default: throw new NotFoundException('Método de pagamento não encontrado')
        }
    }

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
        const paymentData = await this.handlePaymentData(payment)
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
            payment: paymentData,
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
