import { httpClient } from "../httpClient";

export interface SetPaymentRequest {
    checkoutId: string
}

export interface SetPaymentResponse {
    // TODO wip by backend
}

export async function setCheckoutPayment(params: SetPaymentRequest) {
    await httpClient.post<SetPaymentResponse>(`/checkout/${params.checkoutId}/payment`);
}
