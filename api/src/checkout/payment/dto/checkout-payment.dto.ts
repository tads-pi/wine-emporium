import { IsDateString, IsEnum, IsISO8601, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator"

export class SetCheckoutPaymentMethodDTO {
    @IsString()
    @IsNotEmpty()
    @IsEnum(['credit-card', 'bank-slip'])
    paymentMethod: 'credit-card' | 'bank-slip'

    @IsString()
    @IsNotEmpty()
    methodId?: string

    @IsDateString()
    @IsNotEmpty()
    @IsISO8601()
    dueDate: Date

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(12)
    installments: number

    @IsNumber()
    @IsNotEmpty()
    installmentsValue?: number
}