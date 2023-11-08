import { httpClient } from "../httpClient";

export interface FindAddressByIdRequest {
    id: string;
}

export interface Address {
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

export async function getAddressDetails(params: FindAddressByIdRequest) {
    const { data } = await httpClient.get<Address>(`/client/address/${params.id}`);
    return data;
}