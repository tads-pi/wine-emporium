import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../services/authService";

import { SignUpParams } from "../../services/authService/signup";

const schema = z.object({
    name: z.string().nonempty('Nome é obrigatório'),
    document: z.string().nonempty('CPF é obrigatório').refine((value) => {
        const cpf = value.replace(/\D/g, ''); // remove all non-numeric characters
        return cpf.length === 11; // ensure the value is a valid CPF number
    }, 'Informe um CPF válido'),
    email: z.string().nonempty('E-mail é obrigatório').email('Informe um e-mail válido'),
    password: z.string().nonempty('Senha é obrigatório').min(7, 'Senha deve conter no mínimo 8 caracteres'),
    group: z.string().nonempty('Grupo é obrigatório'),
})

type FormData = z.infer<typeof schema>

export function useCreateUserController() {
    const {
        register,
        handleSubmit: hookFormSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const { mutateAsync, isLoading } = useMutation({
        mutationKey: ['signin'],
        mutationFn: async (data: SignUpParams) => {
            return authService.signup(data)
        },
    })



    const handleSubmit = hookFormSubmit(async (data) => {
        try {
            const { message } = await mutateAsync(data)
            alert(message)

            // toast.success('Conta criada com sucesso')
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