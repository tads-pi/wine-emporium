import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from "@tanstack/react-query";
import { mutateKeys } from "../../config/mutationKeys";
import { z } from "zod";
import useStore from "../../zustand/store";
import { Login } from "../../zustand/types";

const schema = z.object({
    email: z.string().nonempty('E-mail é obrigatório').email('Informe um e-mail válido'),
    password: z.string().nonempty('Senha é obrigatório'),
})

type FormData = z.infer<typeof schema>

export function useLoginController() {
    const { authApi } = useStore()

    const {
        register,
        handleSubmit: hookFormSubmit,
        formState: { errors },
        setValue
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const { mutateAsync, isLoading, isError, isSuccess } = useMutation({
        mutationKey: [mutateKeys.CLIENT_AUTH],
        mutationFn: async (data: Login) => {
            return await authApi.login(data)
        },
    })

    const handleSubmit = hookFormSubmit(async (data) => {
        try {
            await mutateAsync(data)
        } catch (error) {
            alert('Credenciais inválidas!')
        }
    })

    return {
        handleSubmit,
        register,
        errors,
        isLoading
    }
}