import { Address, Cart, Deliverer } from ".";

export interface Checkout {
    id: string;
    status: string;
    cart: Cart;
    deliverer: Deliverer;
    address: Address;
    price: number;
}