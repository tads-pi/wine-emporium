import { Product } from "./product";

export interface Cart {
    id: string;
    products: Product[];
}

export interface UpdateCartRequest {
    products: Product[];
}

export interface UpdateCartPayload {
    id: string;
    amount: number;
}