import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SetCheckoutPaymentMethodDTO } from './dto';

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
            await this.handleCreditCardPaymentMethod(clientId, dto.methodId)
        } else if (dto.paymentMethod === 'bank-slip') {
            await this.handleBankSlipPaymentMethod(clientId, dto.methodId)
        } else {
            throw new BadRequestException('Método de pagamento inválido')
        }
        return
    }

    private async handleCreditCardPaymentMethod(checkoutId: string, id: string) {
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
