import { ProductItem } from "../product";
import { Deliverer } from "../deliverer/index"
import { Address } from "../address";

export interface CheckoutItem {
    id: string;
    status: string;
    cart: {
        id: string;
        products: ProductItem[];
    };
    deliverer: Deliverer;
    address: Address;
    price: number;
}

export * from './cancel'
export * from './findById'
export * from './list'
export * from './listDeliverers'
export * from './price'
export * from './setAddress'
export * from './setDeliverer'
export * from './setPayment'
export * from './start'