import { httpClient } from "../httpClient";

export interface CreateAddressRequest {
    country: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    zip: string;
    complement: string;
}

export interface CreateAddressResponse { }

export async function createAddress(params: CreateAddressRequest) {
    const { data } = await httpClient.post<CreateAddressResponse>('/client/address', params);
    return null;
}
