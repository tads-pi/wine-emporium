import { ApiProperty } from "@nestjs/swagger"
import { Address } from "@prisma/client"

export class AddressViewmodel {
    @ApiProperty({
        description: 'Id do endereço',
        example: '55881d20-fc60-4fb3-8ecf-ee7cb3ddcc51',
    })
    id: string

    @ApiProperty({
        description: 'País do endereço',
        example: 'Brasil',
    })
    country: string

    @ApiProperty({
        description: 'Estado do endereço',
        example: 'São Paulo',
    })
    state: string

    @ApiProperty({
        description: 'Cidade do endereço',
        example: 'São Paulo',
    })
    city: string

    @ApiProperty({
        description: 'Bairro do endereço',
        example: 'São Paulo',
    })
    neighborhood: string

    @ApiProperty({
        description: 'Rua do endereço',
        example: 'São Paulo',
    })
    street: string

    @ApiProperty({
        description: 'Número do endereço',
        example: 'São Paulo',
    })
    number: string

    @ApiProperty({
        description: 'CEP do endereço',
        example: 'São Paulo',
    })
    zip: string

    @ApiProperty({
        description: 'Complemento do endereço',
        example: 'São Paulo',
    })
    complement: string

    @ApiProperty({
        description: 'Marcado como endereço de entrega',
        example: true,
    })
    marked: boolean

    constructor(a: Address, marked: boolean = false) {
        Object.assign(this, {
            id: a.id,
            country: a.country,
            state: a.state,
            city: a.city,
            neighborhood: a.neighborhood,
            street: a.street,
            number: a.number,
            zip: a.zip,
            complement: a.complement,
            marked: marked,
        })
    }
}