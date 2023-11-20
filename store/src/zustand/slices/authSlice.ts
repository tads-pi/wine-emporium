import { StateCreator } from "zustand"
import { Slices } from "../store"
import { localStorageKeys } from "../../config/localStorageKeys"
import { Client, Login, LoginResponse, Register, Update } from "../types"
import { httpClient } from "../api/httpClient"

// Essa parte do storage é responsável por todas as chamadas http para a api
export interface AuthSlice {
    login: (payload: Login) => Promise<LoginResponse>
    getMe: () => Promise<Client>
    update: (payload: Update) => Promise<Client>
    isLoggedIn: boolean
    logout: () => void
}

const createAuthSlice: StateCreator<
    Slices,
    [],
    [],
    AuthSlice
> = (set, slices) => {
    return {
        login: async (payload: Login): Promise<LoginResponse> => {
            const { data } = await httpClient.post<LoginResponse>('/client/auth', payload)
            if (data?.access_token) {
                localStorage.setItem(
                    localStorageKeys.ACCESS_TOKEN,
                    data?.access_token,
                )

                slices().authApi.isLoggedIn = true
            }

            return data
        },
        getMe: async (): Promise<Client> => {
            const { data } = await httpClient.get<Client>('/client/me')
            return data
        },
        update: async (payload: Update): Promise<Client> => {
            await httpClient.put('/client/update', payload)
            return slices().authApi.getMe()
        },
        isLoggedIn: !!localStorage.getItem(localStorageKeys.ACCESS_TOKEN),
        logout: () => {
            localStorage.removeItem(localStorageKeys.ACCESS_TOKEN)
            slices().authApi.isLoggedIn = false
        }
    }
}

export default createAuthSlice