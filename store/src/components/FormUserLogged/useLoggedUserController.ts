import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

const schema = z.object({
    name: z.string().nonempty('Nome é obrigatório'),
    document: z.string().nonempty('CPF é obrigatório').refine((value) => {
        const cpf = value.replace(/\D/g, ''); // remove all non-numeric characters
        return cpf.length === 11; // ensure the value is a valid CPF number
    }, 'Informe um CPF válido'),
    email: z.string().nonempty('E-mail é obrigatório').email('Informe um e-mail válido'),
    // password: z.string().nonempty('Senha é obrigatório').min(7, 'Senha deve conter no mínimo 8 caracteres'),
    birthdate: z.string().nonempty('Data de nascimento é obrigatória'),
    gender: z.string().refine(value => ['masculino', 'feminino', 'outros'].includes(value), {
        message: 'Selecione uma opção válida.',
    }),
})

type FormData = z.infer<typeof schema>

export function useLoggedUserController() {

    const {
        register,
        setValue,
        handleSubmit: hookFormSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const { mutateAsync, isLoading } = useMutation({
        mutationKey: ['updateuserdata'],
        // mutationFn: async (data: UpdateUserParams) => {
        //     return authService.updateuserdata(data)
        // },
    })

    const handleSubmit = hookFormSubmit(async (data) => {
        console.log('nosssaaaaaaa', data)
        try {
            // const { message } = await mutateAsync(data)
            alert('Usuário atualizado com sucesso!')
        } catch (error) {
            alert('Erro ao atualizar usuário!')
        }
    })

    return {
        handleSubmit,
        register,
        errors,
        isLoading,
        setValue
    }
}