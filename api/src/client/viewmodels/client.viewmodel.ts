import { Client } from "@prisma/client";

export class ClientViewmodel {
    id: string;
    name: string;
    email: string;
    document: string;
    birthDate: Date;

    constructor(c: Client) {
        Object.assign(this, {
            id: c.id,
            name: c.name,
            email: c.email,
            document: c.document,
            birthDate: c.birthDate,
        });
    }
}
