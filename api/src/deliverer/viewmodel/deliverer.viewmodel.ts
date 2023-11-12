import { Deliverer } from "@prisma/client"

export class DelivererViewmodel {
    id: string
    name: string
    fare: number

    constructor(d: Deliverer) {
        Object.assign(this, {
            id: d.id,
            name: d.name,
            fare: d.fare,
        })
    }
}