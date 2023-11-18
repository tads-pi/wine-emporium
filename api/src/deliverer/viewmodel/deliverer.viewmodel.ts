import { ApiProperty } from "@nestjs/swagger"
import { Deliverer } from "@prisma/client"

export class DelivererViewmodel {
    @ApiProperty({
        description: 'Id do entregador',
        example: '55881d20-fc60-4fb3-8ecf-ee7cb3ddcc51',
    })
    id: string

    @ApiProperty({
        description: 'Nome do serviço de entrega',
        example: 'Sedex',
    })
    name: string

    @ApiProperty({
        description: 'Valor do frete',
        example: 10.99,
    })
    fare: number

    constructor(d: Deliverer) {
        Object.assign(this, {
            id: d.id,
            name: d.name,
            fare: d.fare,
        })
    }
}