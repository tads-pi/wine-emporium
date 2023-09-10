import axios from 'axios'

const apiAuth = axios.create({
    // baseURL: 'https://api.wineemporium.shop/v1',
    baseURL: 'http://localhost:8080/v1',
})

export default apiAuth
