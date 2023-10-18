import { httpClient } from "../httpClient";

export interface UpdateUserParams {
    name: string
    document: string
    password: string
    group: string      
}


export async function updateuserid(params: UpdateUserParams) {
    const id = localStorage.getItem('id') // alterar aqui

    const user = {
        name: params.name,
        document: params.document,
        password: params.password,
        group: params.group
    }
    const { data } = await httpClient.put(`/v1/backoffice/user/${id}`, user)

    return data
}

