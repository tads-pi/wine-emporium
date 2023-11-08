import { httpClient } from "../httpClient";

export interface AuthParams {
    email: string;
    password: string;
}

export interface AuthResponse {
    access_token: string
    expires_in: number
}

export async function auth(params: AuthParams) {
    const { data } = await httpClient.post<AuthResponse>('/client/auth', params)
    return data
}

