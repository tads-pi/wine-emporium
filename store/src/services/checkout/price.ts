import { httpClient } from "../httpClient";

export interface CheckoutPriceRequest {
    checkoutId: string
}

export async function startCheckout(params: CheckoutPriceRequest) {
    await httpClient.get(`/checkout/${params.checkoutId}`);
}
