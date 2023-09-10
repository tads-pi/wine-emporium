import axios from 'axios'

function getUri() {
    switch (import.meta.env.MODE) {
        case "production": return "https://api.wineemporium.shop/v1"
        case "development": return "https://api.dev.wineemporium.shop/v1"
        case "local": return "http://localhost:8080/v1"
    }
}

const api = axios.create({
    baseURL: getUri(),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    timeout: 30000, // 30 seconds
})

api.interceptors.response.use(
    // success case
    (response) => response,
    // error case
    ({ response }) => {
        if (response.status === 401 || response.status === 403) {
            localStorage.removeItem('token')
            window.location.reload()
        }
        return response
    })

export default api