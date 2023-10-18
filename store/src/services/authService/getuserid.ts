import { httpClient } from "../httpClient";

export interface GetUserIdParams {
    id: string;
}

interface GetUserIdResponse {
    id: number
    name: string
    document: string
    email: string
    password: string
    group: string
    active: boolean
    deleted: boolean
    createAt: string
    updatedAt: string
}

export async function getuserid(params: GetUserIdParams) {
    const { data } = await httpClient.get<GetUserIdResponse>(`/v1/backoffice/user/${params.id}`)

    return data
}

