import { IsEnum, IsNotEmpty, IsString } from "class-validator"

export class SetCheckoutPaymentMethodDTO {
    @IsString()
    @IsNotEmpty()
    @IsEnum(['credit-card', 'bank-slip'])
    paymentMethod: 'credit-card' | 'bank-slip'

    @IsString()
    @IsNotEmpty()
    methodId: string
}