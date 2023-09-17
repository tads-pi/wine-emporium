import api from "..";

export interface IUserLoginProps {
    username: string,
    password: string
}

export async function login(user: IUserLoginProps) {
    try {
        const response = await api.post('/auth', user)
        return response
    } catch (error: any) {
        return error?.response ?? {}
    }
}
