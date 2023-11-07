import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SetCheckoutPaymentMethodDTO } from './dto';
import { Checkout } from '@prisma/client';

@Injectable()
export class PaymentService {
    constructor(
        private db: PrismaService
    ) { }

    async setCheckoutPaymentMethod(clientId: string, checkoutId: string, dto: SetCheckoutPaymentMethodDTO): Promise<null> {
        const c = await this.db.client.findUnique({ where: { id: clientId } })
        if (!c) {
            throw new NotFoundException('Cliente não encontrado')
        }
        const checkout = await this.db.checkout.findUnique({ where: { id: checkoutId } })
        if (!checkout) {
            throw new NotFoundException('Checkout não encontrado')
        }

        if (dto.paymentMethod === 'credit-card') {
            await this.handleCreditCardPaymentMethod(clientId, dto)
        } else if (dto.paymentMethod === 'bank-slip') {
            await this.handleBankSlipPaymentMethod(clientId, dto)
        } else {
            throw new BadRequestException('Método de pagamento inválido')
        }
        return
    }

    private async handleCreditCardPaymentMethod(checkoutId: string, dto: SetCheckoutPaymentMethodDTO): Promise<Checkout> {
        const creditCard = await this.db.creditCard.findUnique({ where: { id: dto.methodId } })
        if (!creditCard) {
            throw new NotFoundException('Cartão de crédito não encontrado')
        }
        const creditCardMethod = await this.db.paymentMethod.findFirst({ where: { name: "CARTAO_DE_CREDITO" } })
        const payment = await this.db.payment.create({
            data: {
                methodId: creditCardMethod.id,
                methodExternalId: null,
            }
        })

        const creditCardPayment = await this.db.creditCardPaymentMethod.create({
            data: {
                creditCardId: creditCard.id,
                paymentId: payment.id,
                installments: dto.installments,
                dueDate: dto.dueDate,
                installmentsValue: dto.installmentsValue,
            }
        })

        await this.db.payment.update({
            where: { id: payment.id },
            data: {
                methodExternalId: creditCardPayment.id,
            }
        })

        const checkout = await this.db.checkout.update({
            where: { id: checkoutId },
            data: {
                paymentId: payment.id,
                status: "PAGAMENTO_PENDENTE",
            }
        })

        return checkout
    }

    private async handleBankSlipPaymentMethod(checkoutId: string, dto: SetCheckoutPaymentMethodDTO) {
        const bankSlipMethod = await this.db.paymentMethod.findFirst({ where: { name: "BOLETO" } })
        const payment = await this.db.payment.create({
            data: {
                methodId: bankSlipMethod.id,
                methodExternalId: null,
            }
        })

        const bankSlipPayment = await this.db.bankSlipPaymentMethod.create({
            data: {
                paymentId: payment.id,
                installments: dto.installments,
                dueDate: dto.dueDate,
                installmentsValue: dto.installmentsValue,
            }
        })

        await this.db.payment.update({
            where: { id: payment.id },
            data: {
                methodExternalId: bankSlipPayment.id,
            }
        })

        const checkout = await this.db.checkout.update({
            where: { id: checkoutId },
            data: {
                paymentId: payment.id,
                status: "PAGAMENTO_PENDENTE",
            }
        })

        return checkout
    }
}
