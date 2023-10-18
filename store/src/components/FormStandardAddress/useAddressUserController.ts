import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../services/authService";

import { SignUpParams } from "../../services/authService/signup";
import { UpdateUserParams } from "../../services/authService/updateuserdata";
import React from "react";

const schema = z.object({
    group: z.string().nonempty('Grupo é obrigatório'),
})

type FormData = z.infer<typeof schema>

export function useAddressUserController() {
    // const [groupOptions, setGroupOptions] = React.useState<string[]>(['Group 1', 'Group 2', 'Group 3']);

    const {
        register,
        handleSubmit: hookFormSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const { mutateAsync, isLoading } = useMutation({
        mutationKey: ['updateuserdata'],
        mutationFn: async (data: UpdateUserParams) => {
            return authService.updateuserdata(data)
        },
    })



    const handleSubmit = hookFormSubmit(async (data) => {
        try {
            // const { message } = await mutateAsync(data)
            // alert(message)

            // toast.success('Conta criada com sucesso')
        } catch (error) {
            alert('Erro ao atualizar usuário!')
        }
    })

    return { 
        handleSubmit,
        register,
        errors,
        isLoading
     }
}