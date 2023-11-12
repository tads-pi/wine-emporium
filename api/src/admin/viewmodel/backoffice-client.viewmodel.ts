import { BackofficeClient, BackofficeGroup } from "@prisma/client"
import { BackofficeGroupViewmodel } from "./backoffice-group.viewmodel"

export class BackofficeClientViewmodel {
    id: string
    name: string
    document: string
    email: string
    group: BackofficeGroupViewmodel
    active: boolean

    constructor(c: BackofficeClient, g: BackofficeGroup) {
        Object.assign(this, {
            id: c.id,
            name: c.name,
            document: c.document,
            email: c.email,
            group: new BackofficeGroupViewmodel(g),
            active: c.active,
        })
    }
}