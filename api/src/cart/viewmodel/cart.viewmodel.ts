import { ApiProperty } from "@nestjs/swagger";
import { ProductClientViewmodel } from "../../product/viewmodels/client-product.viewmodel";

export class CartViewmodelProduct extends ProductClientViewmodel {
    @ApiProperty({
        description: 'Quantidade do produto',
        example: 1,
    })
    amount: number
}

export class CartViewmodel {
    @ApiProperty({
        description: 'Id do carrinho',
        example: '55881d20-fc60-4fb3-8ecf-ee7cb3ddcc51',
    })
    id: string

    @ApiProperty({
        description: 'Produtos do carrinho',
    })
    products: CartViewmodelProduct[]
}