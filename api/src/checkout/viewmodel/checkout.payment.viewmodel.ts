import { ClientCreditCardViewmodel } from "src/payment/credit-card/viewmodel/client-credit-card.viewmodel"

export class CheckoutPaymentViewmodel {
    id: string
    method: 'credit-card' | 'bank-slip'
    installments: number
    dueDate: Date
    installmentsValue: number
    creditCard: ClientCreditCardViewmodel | null
}