import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

const schema = z.object({
    address: z.string().nonempty('Nome é obrigatório'),
})

type FormData = z.infer<typeof schema>

// TODO fix this hook

export function useLoggedAddressController() {

    const {
        register,
        setValue,
        handleSubmit: hookFormSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const { mutateAsync, isLoading } = useMutation({
        mutationKey: ['updateuseraddressdata'],
        mutationFn: async (data: { address: string }) => {
            // return authService.updateaddress(data)
        },
    })

    const handleSubmit = hookFormSubmit(async (data) => {
        console.log('nosssaaaaaaa', data)
        try {
            // const { message } = await mutateAsync(data)
        } catch (error) {
            alert('Erro ao atualizar usuário!')
        }
    })

    const handleSubmitMeiosDuvidosos = (async (address: string) => {
        try {
            // const { message } = await mutateAsync({ address })
            // if (message) {
            // alert('Endereço padrão definido com sucesso!')
            // }
        } catch (error) {
            alert('Erro ao definir endereço padrão!')
        }
    })

    return {
        handleSubmit,
        handleSubmitMeiosDuvidosos,
        register,
        errors,
        isLoading,
        setValue,
        control
    }
}