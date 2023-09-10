import axios from 'axios'

function getUri() {
    switch (import.meta.env.MODE) {
        case "production": return "https://api.wineemporium.shop/v1"
        case "development": return "https://api.dev.wineemporium.shop/v1"
        case "local": return "http://localhost:8080/v1"
    }
}

const apiAuth = axios.create({
    baseURL: getUri(),
})

export default apiAuth
