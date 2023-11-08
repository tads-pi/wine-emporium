import { httpClient } from "../httpClient";

export interface UpdateCartRequest {
    products: CartProductUpdate[];
}

export interface CartProductUpdate {
    id: string;
    amount: number;
}

export async function updateCart(request: UpdateCartRequest) {
    const { data } = await httpClient.put('/client/cart', request);
    return null
}
