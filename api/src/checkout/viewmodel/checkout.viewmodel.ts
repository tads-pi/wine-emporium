import { AddressViewmodel } from "../../client/address/viewmodel/address.viewmodel";
import { CartViewmodel } from "../../cart/viewmodel";
import { DelivererViewmodel } from "../../deliverer/viewmodel";
import { PaymentViewmodel } from "../../payment/viewmodel/payment.viewmodel";

export class CheckoutViewmodel {
    id: string
    sequentialId: number
    status: string
    cart: CartViewmodel
    payment: PaymentViewmodel | null
    deliverer: DelivererViewmodel | null
    address: AddressViewmodel | null
    price: number
}