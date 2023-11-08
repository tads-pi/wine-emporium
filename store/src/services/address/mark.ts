import { httpClient } from "../httpClient";

export interface MarkAddressParams {
    id: string;
}

export interface MarkAddressResponse { }

export async function markAddress(params: MarkAddressParams) {
    const { data } = await httpClient.post<MarkAddressResponse>(`/client/address/${params.id}/mark`);
    return data;
}