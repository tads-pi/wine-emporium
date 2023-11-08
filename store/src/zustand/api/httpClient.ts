import axios from 'axios'
import { localStorageKeys } from '../../config/localStorageKeys'

export const httpClient = axios.create({
    baseURL: 'https://api.wineemporium.shop',
})

httpClient.interceptors.request.use(config => {
    const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN)

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
})

httpClient.interceptors.response.use(
    (fulfilled) => {
        console.log({
            method: fulfilled.config.method,
            path: fulfilled.config.url,
            data: fulfilled.data,
        });
        return fulfilled
    }, rejected => {
        console.error({
            method: rejected.config.method,
            path: rejected.config.url,
            data: rejected.data,
        });
        return rejected
    }
)