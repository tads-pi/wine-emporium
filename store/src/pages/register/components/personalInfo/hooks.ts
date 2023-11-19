import { useNavigate } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"
import { useSnackbar } from "notistack"
import useStore from "../../../../zustand/store"

interface FormData {
    firstName: string
    lastName: string
    document: string
    birthDate: string
    genderId: string
}

type usePersonalInfoProps = {
    handleNext: () => void
}

export default function usePersonalInfo(props: usePersonalInfoProps) {
    const { authApi } = useStore()
    const navigate = useNavigate()

    const { enqueueSnackbar } = useSnackbar()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isDirty },
        setValue
    } = useForm<FormData>({ mode: "onChange" })

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log({ data });

        props.handleNext()
        // try {
        // setIsLoading(true)
        //     const payload: Register = {
        //         name: '',
        //         document: '',
        //         email: '',
        //         password: '',
        //         birth_date: '',
        //         genderId: '',
        //     }

        //     authApi
        //         .register(payload)
        //         .then(() => {
        //             enqueueSnackbar(
        //                 "Cadastro realizado com sucesso!",
        //                 { variant: 'success' }
        //             )

        //             navigate(routes.STORE)
        //         })
        // } catch (error) {
        //     enqueueSnackbar(
        //         "Ops... Não foi possível realizar o seu cadastro.",
        //         { variant: 'error' }
        //     )
        // } finally {
        //     setIsLoading(false)
        // }
    }

    return {
        isLoading,
        isValid,
        isDirty,
        handleSubmit,
        register,
        setValue,
        errors,
        onSubmit
    }
};
