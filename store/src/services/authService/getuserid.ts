import { httpClient } from "../httpClient";

interface GetUserIdResponse {
    id: number
    name: string
    document: string
    email: string
    password: string
    birthDate: string
    active: boolean
    deleted: boolean
    createAt: string
    updatedAt: string
    gender: string
}

export async function getuserdata() {
    const { data } = await httpClient.get<GetUserIdResponse>(`/v1/store/user`)
    return data
}

