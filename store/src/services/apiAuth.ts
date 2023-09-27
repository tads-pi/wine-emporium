import axios from 'axios'

const apiAuth = axios.create({
    baseURL: 'https://api.wineemporium.shop',
})

export default apiAuth
