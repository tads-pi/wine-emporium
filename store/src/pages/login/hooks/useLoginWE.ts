import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from "@tanstack/react-query";
import { mutateKeys } from "../../../config/mutationKeys";
import { z } from "zod";
import useStore from "../../../zustand/store";
import { Login } from "../../../zustand/types";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../config/routes";

const schema = z.object({
    email: z.string().nonempty('E-mail é obrigatório').email('Informe um e-mail válido'),
    password: z.string().nonempty('Senha é obrigatório'),
    token: z.string().nonempty('Concluir o captcha é obrigatório'),
})

type FormData = z.infer<typeof schema>

export function useLoginController() {
    const { authApi } = useStore()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit: hookFormSubmit,
        formState: {
            errors,
            isValid,
            isDirty,
        },
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
                .then(({ access_token }) => {
                    if (access_token) {
                        navigate(`${routes.STORE}`)
                    }
                })
        } catch (error) {
            alert('Credenciais inválidas!')
        }
    })

    return {
        handleSubmit,
        register,
        errors,
        isLoading,
        isValid,
        isDirty,
        setValue,
    }
}