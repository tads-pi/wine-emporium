import { httpClient } from "../httpClient";

export interface RegisterParams {
    name: string;
    document: string;
    email: string;
    password: string;
    group: string;
}

export interface RegisterResponse {
    message: string
}

export async function register(params: RegisterParams) {
    const { data } = await httpClient.post<RegisterResponse>('/client/register', params)
    return data
}

