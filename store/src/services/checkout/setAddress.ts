import { httpClient } from "../httpClient";

export interface SetAddressRequest {
    checkoutId: string
    addressId: string
}

export interface SetAddressResponse { }

export async function setCheckoutAddress(params: SetAddressRequest) {
    await httpClient.post<SetAddressResponse>(`/checkout/${params.checkoutId}/address/${params.addressId}`);
}
