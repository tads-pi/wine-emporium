import { z } from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../services";

const schema = z.object({
    name: z.string().nonempty('Nome é obrigatório'),
    document: z.string().nonempty('CPF é obrigatório').refine((value) => {
        const cpf = value.replace(/\D/g, ''); // remove todos os caracteres que não são números
        return cpf.length === 11; // valida se o cpf tem o tamanho certo
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
        mutationKey: ['signun'],
        mutationFn: async (data: authService.RegisterParams) => {
            return authService.register(data)
        },
    })

    const handleSubmit = hookFormSubmit(async (data) => {
        try {
            const { message } = await mutateAsync(data)
            alert(message)
        } catch (error) {
            console.log({ error });
            alert('Problema ao cadastrar novo usário!')
        }
    })

    return {
        handleSubmit,
        register,
        errors,
        isLoading
    }
}