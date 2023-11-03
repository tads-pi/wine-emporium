import { BackofficeGroup } from "@prisma/client"

export class ClientBackofficeViewmodel {
    id: string
    name: string
    document: string
    email: string
    group: BackofficeGroup
    active: boolean
}