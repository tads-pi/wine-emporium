import { httpClient } from "../httpClient";

export interface DeleteAddressParams {
    id: string;
}

export interface DeleteAddressResponse { }

export async function deleteAddress(params: DeleteAddressParams) {
    const { data } = await httpClient.delete<DeleteAddressResponse>(`/client/address/${params.id}`);
    return null
}
