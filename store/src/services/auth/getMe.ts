import { httpClient } from "../httpClient";

export interface GetMeParams { }

export interface GetMeParamsResponse {
    id: string;
    name: string;
    email: string;
    document: string;
    birthDate: Date;
}

export async function getMe(params: GetMeParams) {
    const { data } = await httpClient.post<GetMeParams>('/client/me', params)
    return data
}

