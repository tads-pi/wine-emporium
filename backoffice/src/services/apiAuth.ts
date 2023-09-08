import axios from 'axios'

const apiAuth = axios.create({
    baseURL: 'http://api.wineemporium.store/login',
})

export default apiAuth
