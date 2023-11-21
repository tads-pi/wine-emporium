import { useSnackbar } from "notistack";
import { SubmitHandler, set, useForm } from "react-hook-form";
import useStore from "../../../../zustand/store";
import { useEffect, useState } from "react";
import { NewAddress, NewCreditCard } from "../../../../zustand/types";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../../config/routes";

interface FormData {
    number: string
    expireMonth: string
    expireYear: string
    cvv: string
    flag: string
    full_name: string
}

export default function useProfileWECreditCardAddNewCard({ redirect }: { redirect: string | undefined | null }) {
    const {
        handleSubmit,
        getValues,
        register,
        setValue,
        formState: { errors, isValid, isDirty },
    } = useForm<FormData>({ mode: 'all' });
    const navigate = useNavigate()

    const { paymentApi } = useStore()
    const { enqueueSnackbar } = useSnackbar();

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            setIsLoading(true);

            const payload: NewCreditCard = {
                number: data.number,
                expireMonth: data.expireMonth.length === 1 ? `0${data.expireMonth}` : data.expireMonth,
                expireYear: data.expireYear,
                cvv: data.cvv,
                flag: data.flag.toUpperCase(),
                full_name: data.full_name,
            }

            await paymentApi.createCreditCard(payload)

            enqueueSnackbar(
                'Cartão de Crédito cadastrado com sucesso!',
                { variant: 'success' },
            )

            if (redirect) {
                navigate(redirect)
                return
            }

            navigate(routes.ACCOUNT_CREDIT_CARD)
        } catch (error) {
            enqueueSnackbar(
                'Ops... Ocorreu um erro ao salvar o novo Cartão de Crédito!',
                { variant: 'error' },
            )
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // gambiarrinha pra setar o valor do input de bandeira do cartão
        setValue('flag', 'VISA')
    }, [])

    return {
        isLoading,
        isValid,
        isDirty,
        register,
        getValues,
        setValue,
        errors,
        handleSubmit,
        onSubmit,
    }
};
