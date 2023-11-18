import { ApiProperty } from "@nestjs/swagger"
import { CreditCard } from "@prisma/client"

export class ClientCreditCardViewmodel {
    @ApiProperty({
        description: 'Id do cartão de crédito',
        example: '55881d20-fc60-4fb3-8ecf-ee7cb3ddcc51',
    })
    id: string

    @ApiProperty({
        description: 'Número do cartão de crédito',
        example: '************3456',
    })
    hiddenNumber: string

    @ApiProperty({
        description: 'Data de expiração do cartão de crédito',
        example: '12/2025',
    })
    expirationDate: string

    @ApiProperty({
        description: 'Bandeira do cartão de crédito',
        example: 'VISA',
        enum: ['VISA', 'MASTERCARD'],
    })
    flag: string

    constructor(cc: CreditCard) {
        const hiddenNumber = `****.****.****.${cc.number.slice(cc.number.length - 4, cc.number.length)}`
        Object.assign(this, {
            id: cc.id,
            flag: cc.flag,
            // Mostra só ultimos 4 dígitos
            hiddenNumber: hiddenNumber,
            expirationDate: `${cc.expireMonth}/${cc.expireYear}`,
        })
    }
}