import { useSnackbar } from "notistack";
import { SubmitHandler, useForm } from "react-hook-form";
import useStore from "../../../../zustand/store";
import { useState } from "react";
import { NewAddress } from "../../../../zustand/types";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../../config/routes";

interface FormData {
    state: string;
    city: string;
    neighborhood: string;
    complement: string;
    street: string;
    number: string;
    zip: string;
}

export default function useProfileWEAddressAddNewAddress() {
    const {
        handleSubmit,
        getValues,
        register,
        setValue,
        formState: { errors },
    } = useForm<FormData>();
    const navigate = useNavigate()

    const { addressApi } = useStore()
    const { enqueueSnackbar } = useSnackbar();

    const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState(true);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            setIsLoading(true);

            const payload: NewAddress = {
                country: 'Brasil',
                state: data.state,
                city: data.city,
                neighborhood: data.neighborhood,
                street: data.street,
                number: data.number,
                zip: data.zip,
                complement: data.complement,
            }

            await addressApi.register(payload)

            enqueueSnackbar(
                'Endereço cadastrado com sucesso!',
                { variant: 'success' },
            )

            navigate(routes.ACCOUNT_ADDRESS)
        } catch (error) {
            console.log({ error });
            enqueueSnackbar(
                'Ops... Ocorreu um erro ao salvar o novo endereço!',
                { variant: 'error' },
            )
        } finally {
            setIsLoading(false);
        }
    };

    const [haveZip, setHaveZip] = useState(false);
    function handleZipCodeChange(zip: string) {
        if (zip.length === 8) {
            addressApi.getAddressByZipCode(zip)
                .then((address) => {
                    setValue('state', address.state);
                    setValue('city', address.city);
                    setValue('neighborhood', address.neighborhood);
                    setValue('street', address.street);
                    setValue('complement', address.complement);

                    setHaveZip(true);
                })
                .catch(() => {
                    enqueueSnackbar(
                        'Ops... Ocorreu um erro ao buscar o endereço pelo CEP!',
                        { variant: 'error' },
                    )
                })
        }
    }

    return {
        isLoading,
        isValid,
        register,
        getValues,
        setValue,
        errors,
        handleSubmit,
        onSubmit,
        handleZipCodeChange,
        haveZip,
    }
};
