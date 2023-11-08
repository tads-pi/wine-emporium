import { httpClient } from "../httpClient";

export async function startCheckout() {
    await httpClient.post('/checkout/start');
}
