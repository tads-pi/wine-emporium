import { ApiProperty } from "@nestjs/swagger";
import { ClientCreditCardViewmodel } from "./client-credit-card.viewmodel";

export class PaymentViewmodel {
    @ApiProperty({
        description: 'Id do pagamento',
        example: '55881d20-fc60-4fb3-8ecf-ee7cb3ddcc51',
    })
    id: string

    @ApiProperty({
        description: 'Define se o pagamento é por boleto',
    })
    bankSlip: boolean

    @ApiProperty({
        description: 'Define se o pagamento é por cartão de crédito',
    })
    creditCard: ClientCreditCardViewmodel | null

    @ApiProperty({
        description: 'Quantidade de parcelas',
        example: 2,
    })
    installments: number

    @ApiProperty({
        description: 'Valor das parcelas',
        example: 50.99,
    })
    installmentsValue: number

    @ApiProperty({
        description: 'Data de vencimento das parcelas',
        example: 12,
    })
    dueDate: number

    @ApiProperty({
        description: 'Status do pagamento',
        example: 'PENDING',
    })
    status: string
}