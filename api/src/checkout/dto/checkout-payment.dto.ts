import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class SetCheckoutPaymentMethodDTO {
    @IsString()
    @IsNotEmpty()
    @IsEnum(['credit-card', 'bank-slip'])
    @ApiProperty({
        description: 'Método de pagamento',
        example: 'credit-card',
        enum: ['credit-card', 'bank-slip'],
    })
    paymentMethod: 'credit-card' | 'bank-slip'

    @IsString()
    @ApiProperty({
        description: 'ID do método de pagamento',
        example: 'credit-card',
    })
    methodId: string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Número de parcelas',
        example: 12,
    })
    installments: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Valor das parcelas',
        example: 100,
    })
    installmentsValue: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Valor total',
        example: 1200,
    })
    dueDate: number
}