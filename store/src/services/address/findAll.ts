import { httpClient } from "../httpClient";

export interface FindAllAddressRequest { }

export interface FindAllAddressResponse {
    id: string;
    country: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    zip: string;
    complement: string;
    marked: boolean;
}

export async function findAll(params: FindAllAddressRequest) {
    const { data } = await httpClient.get<FindAllAddressResponse[]>('/client/address', params);
    return data;
}
