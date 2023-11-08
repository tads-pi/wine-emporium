import { Product } from "./product";

export interface Cart {
    id: string;
    products: CartProduct[];
    price: number;
}

export interface UpdateCartPayload {
    id: string;
    amount: number;
}

export interface CartProduct extends Product {
    amount: number;
}

export interface UpdateCartRequest {
    products: Product[];
}
