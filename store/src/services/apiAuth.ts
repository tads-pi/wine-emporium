import axios from 'axios'

const apiAuth = axios.create({
    // baseURL: 'http://192.168.0.39:8765/erp_certacon/',
    baseURL: 'http://192.168.0.39:8787/nossa/',
})

export default apiAuth
