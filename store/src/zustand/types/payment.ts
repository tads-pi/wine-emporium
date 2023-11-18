export interface CreditCard {
    id: string
    hiddenNumber: string
    expirationDate: string
    flag: string
}

export interface NewCreditCard {
    number: string
    expireMonth: string
    expireYear: string
    cvv: string
    flag: string
    full_name: string
}