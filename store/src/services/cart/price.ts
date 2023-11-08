import { httpClient } from "../httpClient";

export interface CartPriceResponse {
    price: number;
}

export async function getCartPrice(): Promise<number> {
    const { data } = await httpClient.get<CartPriceResponse>('/client/cart/price');
    return data.price;
}
