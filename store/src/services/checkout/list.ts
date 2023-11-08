import { CheckoutItem } from ".";
import { httpClient } from "../httpClient";

export async function getCheckouts(): Promise<CheckoutItem[]> {
    const { data } = await httpClient.get<CheckoutItem[]>('/checkout');
    return data;
}
