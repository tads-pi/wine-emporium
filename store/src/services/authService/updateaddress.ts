import { httpClient } from "../httpClient";

export interface UpdateAddressParams {
    address: string
}

export async function updateaddress(params: UpdateAddressParams) {
    const { data } = await httpClient.post(`/v1/store/user/address/mark/${params.address}`, params)

    return data
}

