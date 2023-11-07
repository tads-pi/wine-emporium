import { CartViewmodel } from "src/cart/viewmodel";
import { AddressViewmodel } from "src/client/address/viewmodel/address.viewmodel";
import { DelivererViewmodel } from "../../product/deliverer/viewmodel";
import { CheckoutPaymentViewmodel } from "./checkout.payment.viewmodel";

export class CheckoutViewmodel {
    id: string
    status: string
    cart: CartViewmodel
    payment: CheckoutPaymentViewmodel | null
    deliverer: DelivererViewmodel | null
    address: AddressViewmodel | null
    price: number
}