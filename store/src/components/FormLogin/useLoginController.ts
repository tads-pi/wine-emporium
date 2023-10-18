import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../services/authService";
import { SigninParams } from "../../services/authService/signin";
import useAuthStore from "../../zustand-store/authState";

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
        mutationKey: ['signin'],
        mutationFn: async (data: SigninParams) => {
            return authService.signin(data)
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
            // signin(access_token)
            signin('iefkmekfme') // trocar aqui
        } catch (error) {
            alert('Credenciais inválidas!')
            signin('iefkmekfme')
        }
    })

    return { 
        handleSubmit,
        register,
        errors,
        isLoading
     }
}