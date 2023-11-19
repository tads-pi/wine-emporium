export interface Client {
    id: string;
    name: string;
    email: string;
    document: string;
    birthDate: Date;
    genderId: string;
}

export interface Register {
    name: string;
    document: string;
    birth_date: string;
    email: string;
    password: string;
    genderId: string;
}

export interface Login {
    email: string;
    password: string;
}

export interface LoginResponse {
    access_token: string
    expires_in: number
}

export interface Update {
    name?: string;
    birthDate?: Date;
    genderId?: string;
    email?: string;
}