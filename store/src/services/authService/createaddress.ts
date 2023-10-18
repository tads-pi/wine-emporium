import { httpClient } from "../httpClient";

export interface AddressData {
    cep: string
    logradouro: string
    complemento: string
    numero: string
    cidade: string
    bairro: string
    uf: string
}

export interface CreateAddressParams {
    address: AddressData
}

export async function createaddress(params: CreateAddressParams) {
    const { data } = await httpClient.post('/auth/signin', params)

    return data
}

