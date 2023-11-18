import { AddressViewmodel } from "../../client/address/viewmodel/address.viewmodel";
import { CartViewmodel } from "../../cart/viewmodel";
import { DelivererViewmodel } from "../../deliverer/viewmodel";
import { PaymentViewmodel } from "../../payment/viewmodel/payment.viewmodel";
import { ApiProperty } from "@nestjs/swagger";

export class CheckoutViewmodel {
    @ApiProperty({
        description: 'Id do checkout',
        example: '55881d20-fc60-4fb3-8ecf-ee7cb3ddcc51',
    })
    id: string

    @ApiProperty({
        description: 'Id sequencial do checkout',
        example: 1,
    })
    sequentialId: number

    @ApiProperty({
        description: 'Status do checkout',
        example: 'PENDING',
    })
    status: string

    @ApiProperty({
        description: 'Carrinho do checkout',
    })
    cart: CartViewmodel

    @ApiProperty({
        description: 'Pagamento do checkout',
    })
    payment: PaymentViewmodel | null

    @ApiProperty({
        description: 'Entregador do checkout',
    })
    deliverer: DelivererViewmodel | null

    @ApiProperty({
        description: 'Endereço do checkout',
    })
    address: AddressViewmodel | null

    @ApiProperty({
        description: 'Valor total do checkout',
        example: 100.99,
    })
    price: number
}