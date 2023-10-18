import { httpClient } from "../httpClient";

interface AddressData {
    cep: string
    rua: string
    numero: string
    bairro: string
    estado: string
    cidade: string
    pais: string
}

export interface CreateAddressParams {
    idUser: string
    address: AddressData
}

export async function createaddress(params: CreateAddressParams) {
    const { data } = await httpClient.post('/auth/signin', params) // alterar aqui

    return data
}

