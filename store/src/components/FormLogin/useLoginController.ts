import useAuthStore from "../../zustand-store/authState";
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from "@tanstack/react-query";
import { localStorageKeys } from "../../config/localStorageKeys";
import { z } from "zod";
import { authService } from "../../services";
import { mutateKeys } from "../../config/mutationKeys";

const schema = z.object({
    email: z.string().nonempty('E-mail é obrigatório').email('Informe um e-mail válido'),
    password: z.string().nonempty('Senha é obrigatório'),
})

type FormData = z.infer<typeof schema>

export function useLoginController() {
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
        mutationFn: async (data: authService.AuthParams) => {
            return await authService.auth(data)
        },
    })

    const { signedIn, signin } = useAuthStore((store) => {
        return {
            signedIn: store.signedIn,
            signin: store.signin,
        };
    })

    const handleSubmit = hookFormSubmit(async (data) => {
        try {
            const { access_token } = await mutateAsync(data)
            signin(access_token)
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