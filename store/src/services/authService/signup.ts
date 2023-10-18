import { httpClient } from "../httpClient";

export interface SignUpParams {
    name: string;
    document: string;
    email: string;
    password: string;
    group: string;
}

interface SignupResponse {
    message: string
}

export async function signup(params: SignUpParams) {
    const { data } = await httpClient.post<SignupResponse>('/v1/store/register', params)

    return data
}

