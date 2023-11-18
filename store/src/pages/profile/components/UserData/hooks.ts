import { SubmitHandler, useForm } from "react-hook-form";
import useStore from "../../../../zustand/store";
import { useEffect, useState } from "react";
import { Client, Gender, Update } from "../../../../zustand/types";
import { useSnackbar } from "notistack";

interface FormData {
    firstName: string;
    lastName: string;
    birthDate: string;
    genderId: string;
}

export default function useUserData() {
    const {
        handleSubmit,
        control,
        register,
        setValue,
        formState: { errors },
    } = useForm<FormData>();

    const { enqueueSnackbar } = useSnackbar();

    const {
        authApi,
        genderApi
    } = useStore()

    const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [userData, setUserData] = useState<Client | null>(null);
    const [genders, setGenders] = useState<Gender[] | null>(null);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            setIsLoading(true);

            const payload: Update = {
                name: `${data.firstName} ${data.lastName}`,
                birthDate: new Date(data.birthDate),
                genderId: data.genderId,
            }

            await authApi.update(payload)

            enqueueSnackbar(
                'Dados atualizados com sucesso!',
                { variant: 'success' },
            )
        } catch (error) {
            console.log({ error });
            enqueueSnackbar(
                'Ops... Ocorreu um erro ao atualizar seus dados!',
                { variant: 'error' },
            )
        } finally {
            setIsLoading(false);
        }
    };

    function updateUserData(field: string, value: any) {
        if (userData) {
            let newUserData: Client = {
                ...userData,
                [field]: value,
            }
            setUserData(newUserData)
        }

    }

    useEffect(() => {
        genderApi.getGenderOptions()
            .then(genders => setGenders(genders))

        // Fetch user data from API
        authApi.getMe()
            .then((data) => {
                const nameParts = data.name.split(' ');
                setValue('firstName', nameParts[0]);
                setValue('lastName', nameParts[nameParts.length - 1]);
                setValue('birthDate', new Date(data.birthDate).toISOString().split('T')[0]);
                setValue('genderId', data.genderId);

                setUserData(data)
            })
    }, [authApi, genderApi]);

    return {
        userData,
        updateUserData,
        genders,
        isLoading,
        isValid,
        register,
        setValue,
        errors,
        handleSubmit,
        onSubmit,
    }
};
