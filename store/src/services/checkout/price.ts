import { httpClient } from "../httpClient";

export async function getPrice(checkoutId: string) {
    await httpClient.get(`/checkout/${checkoutId}`);
}
