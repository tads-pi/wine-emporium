import axios from 'axios'

const apiAuth = axios.create({
    baseURL: 'https://api.dev.wineemporium.shop',
})

export default apiAuth
