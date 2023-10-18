import { api } from "../lib/axios"
import { useMutation } from "@tanstack/react-query"

const postLogin = async (user) => {
        return await api.post('/v1/backoffice/auth', user)
}


export function useLogin() {
    const mutate = useMutation({
        mutationFn: postLogin
    })

    return mutate
}