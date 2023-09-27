import axios from 'axios'

function getUri() {
    return import.meta.env.VITE_WE_BASE_URL
}

const api = axios.create({
    baseURL: getUri(),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    timeout: 30000, // 30 seconds
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `${token}`
        }
        return config
    }
)

api.interceptors.response.use(
    // success case
    (response) => response,
    // error case
    ({ response }) => {
        if (response.status === 401) {
            localStorage.removeItem('token')
            window.location.reload()
        }
        return response
    })
// TODO add interceptor to handle 403 errors with hooks

export default api