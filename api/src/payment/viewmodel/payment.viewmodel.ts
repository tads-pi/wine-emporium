import { ClientCreditCardViewmodel } from "./client-credit-card.viewmodel";

export class PaymentViewmodel {
    id: string
    bankSlip: boolean
    creditCard: ClientCreditCardViewmodel | null
    installments: number
    installmentsValue: number
    dueDate: number
    status: string
}