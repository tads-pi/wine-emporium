import { CartViewmodel } from "src/cart/viewmodel";
import { AddressViewmodel } from "src/client/address/viewmodel/address.viewmodel";
import { DelivererViewmodel } from "src/product/deliverer/viewmodel";

export class CheckoutViewmodel {
    id: string
    status: string
    cart: CartViewmodel
    // payment: PaymentViewmodel | null // TODO
    deliverer: DelivererViewmodel | null
    address: AddressViewmodel | null
    price: number
}