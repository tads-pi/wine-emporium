import { httpClient } from "../httpClient";
import { CheckoutItem } from ".";

export async function findById(checkoutId: string): Promise<CheckoutItem> {
    const { data } = await httpClient.get<CheckoutItem>(`/checkout/${checkoutId}`);
    return data;
}
