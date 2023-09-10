import axios from 'axios'

function getUri() {
    switch (import.meta.env.MODE) {
        case "production": return "https://api.wineemporium.shop/v1"
        case "development": return "https://api.dev.wineemporium.shop/v1"
        case "local": return "http://localhost:8080/v1"
    }
}

export const api = axios.create({
    baseURL: getUri(),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    timeout: 30000, // 30 seconds
})
// handle not authorized
api.interceptors.response.use((response) => {
    if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('token')
    }
    return response
})
