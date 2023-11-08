import { httpClient } from "../httpClient";

export interface SetDelivererRequest {
    checkoutId: string
    delivererId: string
}

export interface SetDelivererResponse { }

export async function setCheckoutDeliverer(params: SetDelivererRequest) {
    await httpClient.post<SetDelivererResponse>(`/checkout/${params.checkoutId}/deliverer/${params.delivererId}`);
}
