import { CartViewmodel } from "../../cart/viewmodel";
import { AddressViewmodel } from "../../client/address/viewmodel/address.viewmodel";
import { DelivererViewmodel } from "../../deliverer/viewmodel";

export class CheckoutViewmodel {
    id: string
    sequentialId: number
    status: string
    cart: CartViewmodel
    // payment: PaymentViewmodel | null // TODO
    deliverer: DelivererViewmodel | null
    address: AddressViewmodel | null
    price: number
}