import { SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"
import { useSnackbar } from "notistack"
import { LoginInfoPayload } from "../../../../zustand/types"
import useStore from "../../../../zustand/store"
import { jwtDecode } from "jwt-decode";

interface FormData {
    email: string
    password: string
    confirmPassword: string
}

type useLoginInfoProps = {
    handleNext: () => void
}

export default function useLoginInfo(props: useLoginInfoProps) {
    const { registerApi } = useStore()
    const { enqueueSnackbar } = useSnackbar()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isDirty },
        setValue,
        getValues,
        setError
    } = useForm<FormData>({ mode: "onChange" })

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            setIsLoading(true)
            const payload: LoginInfoPayload = {
                email: data.email,
                password: data.password,
            }

            const errors = await registerApi.setLoginInfo(payload)
            if (errors.length === 0) {
                registerApi.register()
                    .then((data) => {
                        if (data.access_token) {
                            props.handleNext()
                        }
                    })
                return
            }

            errors.forEach((e) => {
                type fields = "email" | "password" | "confirmPassword"
                const field = e.field as fields
                setError(field, { message: e.message })
            })
        } catch (error) {
            enqueueSnackbar(
                "Ops... Não foi possível seguir com seu cadastro.",
                { variant: 'error' }
            )
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        isValid,
        isDirty,
        handleSubmit,
        register,
        getValues,
        errors,
        onSubmit
    }
};
