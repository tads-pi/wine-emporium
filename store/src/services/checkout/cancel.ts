import { httpClient } from "../httpClient";

export interface CancelCheckoutParams {
    checkoutId: string;
}

export async function cancelCheckout(params: CancelCheckoutParams) {
    await httpClient.delete(`/checkout/${params.checkoutId}`);
}
