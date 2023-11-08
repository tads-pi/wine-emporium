import { StateCreator } from "zustand"
import { Slices } from "../store"
import { localStorageKeys } from "../../config/localStorageKeys"
import { Client, Login, LoginResponse, Register, Update } from "../types"
import { httpClient } from "../api/httpClient"

// Essa parte do storage é responsável por todas as chamadas http para a api
export interface AuthSlice {
    register: (payload: Register) => Promise<LoginResponse>
    login: (payload: Login) => Promise<LoginResponse>
    getMe: () => Promise<Client>
    update: (payload: Update) => Promise<Client>
}

const createAuthSlice: StateCreator<
    Slices,
    [],
    [],
    AuthSlice
> = (set, slices) => {
    return {
        register: async (payload: Register): Promise<LoginResponse> => {
            const { data } = await httpClient.post<LoginResponse>('/client/register', payload)
            return data
        },
        login: async (payload: Login): Promise<LoginResponse> => {
            const { data } = await httpClient.post<LoginResponse>('/client/auth', payload)
            if (data?.access_token) {
                localStorage.setItem(
                    localStorageKeys.ACCESS_TOKEN,
                    data?.access_token,
                )
                slices().setIsLoggedIn(true)
            }

            return data
        },
        getMe: async (): Promise<Client> => {
            const { data } = await httpClient.get<Client>('/client/me')
            return data
        },
        update: async (payload: Update): Promise<Client> => {
            await httpClient.put('/client/update', payload)

            const { data } = await httpClient.post<Client>('/client/me')
            return data
        }
    }
}

export default createAuthSlice