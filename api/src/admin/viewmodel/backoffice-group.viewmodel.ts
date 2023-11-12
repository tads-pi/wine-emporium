import { BackofficeGroup } from "@prisma/client";

export class BackofficeGroupViewmodel {
    id: string;
    name: string;

    constructor(g: BackofficeGroup) {
        Object.assign(this, {
            id: g.id,
            name: g.name,
        })
    }
}