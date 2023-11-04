import { Address } from "@prisma/client"

export class AddressViewmodel {
    id: string
    country: string
    state: string
    city: string
    neighborhood: string
    street: string
    number: string
    zip: string
    complement: string
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