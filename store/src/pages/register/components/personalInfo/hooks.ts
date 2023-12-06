import { SubmitHandler, useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useSnackbar } from "notistack"
import { Gender, PersonalInfoPayload } from "../../../../zustand/types"
import useStore from "../../../../zustand/store"

interface FormData {
    firstName: string
    lastName: string
    document: string
    birthDate: string
    genderId: string
    token: string
}

type usePersonalInfoProps = {
    handleNext: () => void
}

export default function usePersonalInfo(props: usePersonalInfoProps) {
    const { registerApi, genderApi } = useStore()
    const { enqueueSnackbar } = useSnackbar()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isDirty },
        setValue,
        setFocus,
        setError,
        getValues,
    } = useForm<FormData>({ mode: "all" })

    const [alreadySubmitted, setAlreadySubmitted] = useState<boolean>(false)
    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            setIsLoading(true)
            const payload: PersonalInfoPayload = {
                name: `${data.firstName} ${data.lastName}`,
                document: data.document,
                birth_date: data.birthDate,
                genderId: data.genderId,
            }

            const errors = await registerApi.setPersonalInfo(payload)
            if (errors.length === 0) {
                props.handleNext()
                return
            }

            errors.forEach((e) => {
                type fields = "firstName" | "lastName" | "document" | "birthDate" | "genderId"
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

    // Autofill
    const [genders, setGenders] = useState<Gender[] | null>(null)
    useEffect(() => {
        genderApi.getGenderOptions().then((genders) => {
            setGenders(genders)
            setValue('genderId', genders[0].id)
        })
    }, [genderApi])

    useEffect(() => {
        const personalInfo = registerApi.getPersonalInfo()
        // validação simples pra saber se o passo já foi preenchido
        if (personalInfo.name) {
            setAlreadySubmitted(true)
        }
        setValue('firstName', personalInfo.name.split(' ')[0])
        setValue('lastName', personalInfo.name.split(' ')[1])
        setValue('document', personalInfo.document)
        setValue('birthDate', personalInfo.birth_date)
        setValue('genderId', personalInfo.genderId)
    }, [registerApi])

    return {
        alreadySubmitted,
        isLoading,
        isValid,
        isDirty,
        handleSubmit,
        register,
        setValue,
        errors,
        onSubmit,
        genders,
        getValues
    }
};
