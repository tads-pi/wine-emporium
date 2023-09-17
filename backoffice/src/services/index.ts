import axios from 'axios'

function getUri() {
    return import.meta.env.VITE_WE_BASE_URL
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
        if (response.status === 401) {
            localStorage.removeItem('token')
            window.location.reload()
        }
        return response
    })
// TODO add interceptor to handle 403 errors with hooks

export default api