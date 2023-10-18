import axios from 'axios'
import { localStorageKeys } from '../config/localStorageKeys'

export const httpClient = axios.create({
    // baseURL: import.meta.env.VITE_API_URL,
    baseURL: 'https://api.wineemporium.shop',
})

httpClient.interceptors.request.use(config => {
    const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN) // alterar aqui

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
}) 