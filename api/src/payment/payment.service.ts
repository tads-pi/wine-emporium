import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ClientCreditCardViewmodel } from './viewmodel/client-credit-card.viewmodel';
import { SaveCreditCardDTO } from './dto/save-credit-card.dto';

@Injectable()
export class PaymentService {
    constructor(
        private db: PrismaService
    ) { }

    async getAllCreditCards(clientId: string): Promise<ClientCreditCardViewmodel[]> {
        const creditCardsIds = await this.db.clientCreditCard.findMany({
            where: { clientId: clientId }
        })
        const creditCards = await this.db.creditCard.findMany({
            where: { id: { in: creditCardsIds.map(cc => cc.creditCardId) } }
        })

        return creditCards.map(cc => new ClientCreditCardViewmodel(cc))
    }

    async saveNewCreditCard(clientId: string, dto: SaveCreditCardDTO): Promise<ClientCreditCardViewmodel> {
        const c = await this.db.client.findUnique({ where: { id: clientId } })
        if (!c) {
            throw new NotFoundException('Cliente não encontrado')
        }

        const expMonth = Number(dto.expireMonth)
        const expYear = Number(dto.expireYear)

        if (expYear < (new Date().getFullYear() - 2000)) {
            throw new BadRequestException('Cartão de crédito expirado')
        }

        const creditCard = await this.db.creditCard.create({
            data: {
                number: dto.number,
                cvv: dto.cvv,
                flag: dto.flag,
                expireMonth: expMonth,
                expireYear: expYear,
                full_name: dto.full_name
            }
        })

        await this.db.clientCreditCard.create({
            data: {
                clientId: clientId,
                creditCardId: creditCard.id
            }
        })

        return new ClientCreditCardViewmodel(creditCard)
    }

    async deleteCreditCard(clientId: string, creditCardId: string): Promise<null> {
        const cc = await this.db.clientCreditCard.findUnique({
            where: {
                id: creditCardId,
                clientId: clientId,
            }
        })
        if (!cc) {
            throw new NotFoundException('Cartão de crédito não encontrado')
        }

        try {
            await this.db.clientCreditCard.update({
                where: {
                    id: creditCardId,
                    clientId: clientId,
                },
                data: {
                    active: false
                }
            })
        } catch (error) {
            throw new InternalServerErrorException('Erro ao deletar cartão de crédito')
        }

        return null
    }
}
