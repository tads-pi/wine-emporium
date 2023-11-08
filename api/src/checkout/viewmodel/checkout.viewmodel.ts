import { CartViewmodel } from "src/cart/viewmodel";
import { AddressViewmodel } from "src/client/address/viewmodel/address.viewmodel";
import { DelivererViewmodel } from "../../product/deliverer/viewmodel";

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