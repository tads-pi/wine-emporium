export interface Client {
    id: string;
    name: string;
    email: string;
    document: string;
    birthDate: Date;
}

export interface Register {
    name: string;
    document: string;
    email: string;
    password: string;
    group: string;
}

export interface Login {
    email: string;
    password: string;
}

export interface LoginResponse {
    access_token: string
    expires_in: number
}