import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CheckoutViewmodel } from './viewmodel/checkout.viewmodel';
import { Checkout } from '@prisma/client';
import { AddressViewmodel } from '../client/address/viewmodel/address.viewmodel';
import { CartService } from '../cart/cart.service';
import { DelivererViewmodel } from '../deliverer/viewmodel';
import { SetCheckoutPaymentMethodDTO } from './dto';
import { PaymentViewmodel } from '../payment/viewmodel/payment.viewmodel';
import { ClientCreditCardViewmodel } from '../payment/viewmodel/client-credit-card.viewmodel';
import { UpdateCheckoutStatusDTO } from './dto/backoffice.dto';

@Injectable()
export class CheckoutService {
    constructor(
        private db: PrismaService,
        private cartSvc: CartService,
    ) { }

    private async getClientCheckout(clientId: string, checkoutId: string): Promise<Checkout> {
        const cart = await this.db.cart.findFirst({
            where: {
                clientId: clientId,
                status: "OPEN"
            }
        })
        if (!cart) {
            throw new NotFoundException('Carrinho não encontrado')
        }

        const checkout = await this.db.checkout.findUnique({
            where: {
                id: checkoutId,
                cartId: cart.id
            }
        })

        return checkout
    }

    private async fillCheckoutWithData(c: Checkout): Promise<CheckoutViewmodel> {
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

        let paymentViewmodel: PaymentViewmodel
        if (payment) {
            const PAYMENT_METHOD = await this.db.paymentMethod.findFirst({
                where: { id: payment.methodId }
            })

            switch (PAYMENT_METHOD.name) {
                case 'CARTAO_DE_CREDITO':
                    const ccpm = await this.db.creditCardPaymentMethod.findFirst({
                        where: { paymentId: payment.id }
                    })
                    const cc = await this.db.creditCard.findUnique({
                        where: { id: ccpm.creditCardId }
                    })

                    paymentViewmodel = {
                        id: payment.id,
                        bankSlip: false,
                        creditCard: new ClientCreditCardViewmodel(cc),
                        installments: ccpm.installments,
                        installmentsValue: ccpm.installmentsValue,
                        dueDate: ccpm.dueDate,
                        status: c.status,
                    }
                    break;

                case 'BOLETO':
                    const bspm = await this.db.bankSlipPaymentMethod.findFirst({
                        where: { paymentId: payment.id }
                    })

                    paymentViewmodel = {
                        id: payment.id,
                        bankSlip: true,
                        creditCard: null,
                        installments: bspm.installments,
                        installmentsValue: bspm.installmentsValue,
                        dueDate: bspm.dueDate,
                        status: c.status,
                    }
                    break;
            }
        }

        const cartPrice = await this.cartSvc.calculateCartPrice(cart.id)
        const price = Number(cartPrice + (deliverer?.fare || 0)).toFixed(2)

        const viewmodel: CheckoutViewmodel = {
            id: c.id,
            sequentialId: c.sequentialId,
            status: c.status,
            cart: {
                id: cart.id,
                products: await this.cartSvc.getProductsFromCart(cart),
                price: cartPrice,
            },
            deliverer: deliverer ? new DelivererViewmodel(deliverer) : null,
            address: address ? new AddressViewmodel(address, false) : null,
            payment: payment ? paymentViewmodel : null,
            price: Number(price),
            payedAt: c.payedAt?.toISOString() || null,
        }

        return viewmodel
    }

    async listCheckout(clientId: string): Promise<CheckoutViewmodel[]> {
        const allCarts = await this.db.cart.findMany({
            where: {
                clientId: clientId,
                active: true,
            }
        })
        const allCheckouts = await this.db.checkout.findMany({
            where: {
                cartId: {
                    in: allCarts.map(c => c.id)
                },
                status: {
                    notIn: ['ENDERECO_PENDENTE', 'ENTREGADOR_PENDENTE', 'METODO_DE_PAGAMENTO_PENDENTE']
                },
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        let viewmodel: CheckoutViewmodel[] = []
        for (const c of allCheckouts) {
            viewmodel.push(await this.fillCheckoutWithData(c))
        }

        return viewmodel
    }

    async listCheckoutForBackoffice(): Promise<CheckoutViewmodel[]> {
        const allCheckouts = await this.db.checkout.findMany({
            where: {
                status: {
                    notIn: ['ENDERECO_PENDENTE', 'ENTREGADOR_PENDENTE', 'METODO_DE_PAGAMENTO_PENDENTE']
                }
            },
            orderBy: {
                createdAt: 'desc'
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

    async getCheckoutByIdForBackoffice(id: string): Promise<CheckoutViewmodel> {
        const c = await this.db.checkout.findUnique({
            where: { id },
        });
        if (!c) {
            throw new NotFoundException('Checkout não encontrado');
        }

        return await this.fillCheckoutWithData(c)
    }

    async updateCheckoutForBackoffice(dto: UpdateCheckoutStatusDTO): Promise<null> {
        const c = await this.db.checkout.findUnique({
            where: { id: dto.id },
        });
        if (!c) {
            throw new NotFoundException('Checkout não encontrado');
        }

        await this.db.checkout.update({
            where: { id: dto.id },
            data: { status: dto.status }
        })

        return null
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
                    status: 'ENDERECO_PENDENTE',
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

        await this.db.cart.update({
            where: { id: cart.id },
            data: { status: 'DELETED' }
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
            data: { status: "AGUARDANDO_PAGAMENTO" }
        })

        await this.db.cart.update({
            where: { id: cart.id },
            data: { status: 'DONE' }
        })

        return await this.fillCheckoutWithData(checkout)
    }

    async setCheckoutAddress(clientId: string, checkoutId: string, addressId: string): Promise<CheckoutViewmodel> {
        // Verifica se o checkout pertence ao cliente em questão
        let c = await this.getClientCheckout(clientId, checkoutId)

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
        // Verifica se o checkout pertence ao cliente em questão
        let c = await this.getClientCheckout(clientId, checkoutId)
        if (c.status !== 'ENTREGADOR_PENDENTE') {
            throw new BadRequestException('Defina o endereço antes.')
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

    async setCheckoutPaymentMethod(clientId: string, checkoutId: string, dto: SetCheckoutPaymentMethodDTO): Promise<CheckoutViewmodel> {
        // Verifica se o checkout pertence ao cliente em questão
        let c = await this.getClientCheckout(clientId, checkoutId)
        if (c.status !== 'METODO_DE_PAGAMENTO_PENDENTE') {
            throw new BadRequestException('Defina o entregador antes.')
        }

        let paymentId: string
        switch (dto.paymentMethod) {
            case 'credit-card':
                paymentId = await this.newCreditCardPayment(dto)
                break;
            case 'bank-slip':
                paymentId = await this.newBankSlipPayment(dto)
                break;
            default:
                throw new BadRequestException('Método de pagamento inválido')
        }

        c = await this.db.checkout.update({
            where: { id: checkoutId },
            data: {
                paymentId: paymentId,
                status: 'AGUARDANDO_PAGAMENTO'
            }
        })

        return await this.fillCheckoutWithData(c)
    }

    private async newCreditCardPayment(dto: SetCheckoutPaymentMethodDTO): Promise<string> {
        const CREDIT_CARD_METHOD = await this.db.paymentMethod.findFirst({
            where: { name: 'CARTAO_DE_CREDITO' },
        })

        const payment = await this.db.payment.create({
            data: { methodId: CREDIT_CARD_METHOD.id }
        })

        const creditCard = await this.db.creditCard.findUnique({ where: { id: dto.methodId } })
        if (!creditCard) {
            throw new NotFoundException('Cartão de crédito não encontrado')
        }

        await this.db.creditCardPaymentMethod.create({
            data: {
                installments: dto.installments,
                installmentsValue: dto.installmentsValue,
                dueDate: dto.dueDate,
                paymentId: payment.id,
                creditCardId: creditCard.id,
            }
        })

        return payment.id
    }

    private async newBankSlipPayment(dto: SetCheckoutPaymentMethodDTO): Promise<string> {
        const BANK_SLIP_METHOD = await this.db.paymentMethod.findFirst({
            where: { name: 'BOLETO' }
        })

        const payment = await this.db.payment.create({
            data: { methodId: BANK_SLIP_METHOD.id }
        })

        await this.db.bankSlipPaymentMethod.create({
            data: {
                installments: dto.installments,
                installmentsValue: dto.installmentsValue,
                dueDate: dto.dueDate,
                paymentId: payment.id,
            }
        })

        return payment.id
    }

    async listStatus(): Promise<string[]> {
        return [
            'AGUARDANDO_PAGAMENTO',
            'PAGAMENTO_COM_SUCESSO',
            'PAGAMENTO_REJEITADO',
            'AGUARDANDO_RETIRADA',
            'EM_TRANSITO',
            'ENTREGUE',
        ]
    }

    async updateStatus(clientId: string, checkoutId: string, status: string): Promise<CheckoutViewmodel> {
        // Verifica se o checkout pertence ao cliente em questão
        let c = await this.getClientCheckout(clientId, checkoutId)
        if (c.status !== 'AGUARDANDO_PAGAMENTO') {
            throw new BadRequestException('Método de pagamento não foi definido.')
        }

        type StatusEnum = 'AGUARDANDO_PAGAMENTO' | 'PAGAMENTO_COM_SUCESSO' | 'PAGAMENTO_REJEITADO' | 'AGUARDANDO_RETIRADA' | 'EM_TRANSITO' | 'ENTREGUE'
        const statusEnum: StatusEnum = status as StatusEnum
        if (!statusEnum) {
            throw new BadRequestException('Status inválido')
        }

        c = await this.db.checkout.update({
            where: { id: checkoutId },
            data: { status: statusEnum }
        })

        return await this.fillCheckoutWithData(c)
    }
}
