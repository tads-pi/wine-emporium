import axios from 'axios'
import { localStorageKeys } from '../../config/localStorageKeys'
import { routes } from '../../config/routes'

export const httpClient = axios.create({
    baseURL: 'http://localhost:3000',
    // baseURL: 'https://api.wineemporium.shop',
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
        // console.log({
        //     method: fulfilled.config.method,
        //     path: fulfilled.config.url,
        //     data: fulfilled.data,
        // });
        return fulfilled
    }, rejected => {
        // console.error({
        //     method: rejected.config.method,
        //     path: rejected.config.url,
        //     data: rejected.data,
        // });

        if (rejected.response?.status === 401) {
            localStorage.removeItem(localStorageKeys.ACCESS_TOKEN)
            window.location.href = routes.LOGIN
        }

        return rejected
    }
)