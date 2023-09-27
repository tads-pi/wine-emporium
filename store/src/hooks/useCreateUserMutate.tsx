import { api } from "../lib/axios"
import { useMutation } from "@tanstack/react-query"
import { ICreateUserProps } from "../interfaces"

const postCreateUser = async (user: ICreateUserProps) => {
        return await api.post('/v1/backoffice/auth', user)
}


export function useCreateUser() {
    const mutate = useMutation({
        mutationFn: postCreateUser
    })

    return mutate
}