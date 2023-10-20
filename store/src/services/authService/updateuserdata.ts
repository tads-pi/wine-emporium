import { httpClient } from "../httpClient";
import { AddressData } from "./createaddress";

export interface UpdateUserParams {
    name: string
    document: string
    // password: string
    email: string
    birthdate: string
    gender: string
    // address?: AddressData[]
}


export async function updateuserdata(params: UpdateUserParams) {
    const user = {
        name: params.name,
        document: params.document,
        email: params.email,
        birthDate: params.birthdate,
        gender: params.gender,
        // address: params.address,
    }
    const { data } = await httpClient.put(`/v1/store/user`, user)

    return data
}

