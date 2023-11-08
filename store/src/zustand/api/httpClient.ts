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
            path: fulfilled.config.url,
            data: fulfilled.data,
        });
        return fulfilled
    }, rejected => {
        console.error({
            path: rejected.config.url,
            data: rejected.data,
        });
        return rejected
    }
)