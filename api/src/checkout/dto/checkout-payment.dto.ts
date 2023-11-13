import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class SetCheckoutPaymentMethodDTO {
    @IsString()
    @IsNotEmpty()
    @IsEnum(['credit-card', 'bank-slip'])
    paymentMethod: 'credit-card' | 'bank-slip'

    @IsString()
    @IsNotEmpty()
    methodId: string

    @IsNumber()
    @IsNotEmpty()
    installments: number

    @IsNumber()
    @IsNotEmpty()
    installmentsValue: number

    @IsNumber()
    @IsNotEmpty()
    dueDate: number
}