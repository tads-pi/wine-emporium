import { CreditCard } from "@prisma/client"

export class ClientCreditCardViewmodel {
    id: string
    hiddenNumber: string
    expirationDate: string
    flag: string

    constructor(cc: CreditCard) {
        const hiddenNumber = `****.****.****.${cc.number.slice(cc.number.length - 4, cc.number.length)}`
        Object.assign(this, {
            id: cc.id,
            flag: cc.flag,
            // Mostra só ultimos 4 dígitos
            hiddenNumber: hiddenNumber,
            expirationDate: `${cc.expireMonth}/${cc.expireYear}`,
        })
    }
}