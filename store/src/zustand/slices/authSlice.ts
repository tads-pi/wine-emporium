import { StateCreator } from "zustand"
import { Slices } from "../store"
import { localStorageKeys } from "../../config/localStorageKeys"
import { Client, Login, LoginResponse, Register } from "../types"
import { httpClient } from "../api/httpClient"

// Essa parte do storage é responsável por todas as chamadas http para a api
export interface AuthSlice {
    register: (payload: Register) => Promise<void>
    login: (payload: Login) => Promise<void>
    getMe: () => Promise<Client>
}

const createAuthSlice: StateCreator<
    Slices,
    [],
    [],
    AuthSlice
> = (set, slices) => {
    return {
        register: async (payload: Register): Promise<void> => {
            await httpClient.post('/client/register', payload)
        },
        login: async (payload: Login): Promise<void> => {
            const { data } = await httpClient.post<LoginResponse>('/client/auth', payload)

            localStorage.setItem(localStorageKeys.ACCESS_TOKEN, data?.access_token || '')
            // TODO add in storage props for authentication
        },
        getMe: async (): Promise<Client> => {
            const { data } = await httpClient.post<Client>('/client/me')
            return data
        }
    }
}

export default createAuthSlice