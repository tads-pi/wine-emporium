import { httpClient } from "../httpClient";

export interface SigninParams {
    email: string;
    password: string;
}

interface SigninResponse {
    access_token: string
    expires_in: number
}

export async function signin(params: SigninParams) {
    const { data } = await httpClient.post<SigninResponse>('/v1/store/auth', params)
    console.log("auth data: ", data);
    return data
}

