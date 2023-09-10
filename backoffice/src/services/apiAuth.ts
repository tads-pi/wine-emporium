import axios from 'axios'

const apiAuth = axios.create({
    baseURL: import.meta.env.API_URL,
})

export default apiAuth
