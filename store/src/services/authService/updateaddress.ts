import { httpClient } from "../httpClient";

export interface UpdateAddressParams {
    idAddress: string
}

export async function updateaddress(params: UpdateAddressParams) {
    const { data } = await httpClient.put(`/auth/signin${params.idAddress}`, params)

    return data
}

