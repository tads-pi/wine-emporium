import api from "..";

export interface IUserLoginProps {
    email: string,
    password: string
}

export async function login(user: IUserLoginProps) {
    try {
        const response = await api.post('/backoffice/auth', user)
        return response
    } catch (error: any) {
        return error?.response ?? {}
    }
}
