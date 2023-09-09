import axios from 'axios'

const apiAuth = axios.create({
    baseURL: 'https://api.wineemporium.shop/v1',
})

export default apiAuth
