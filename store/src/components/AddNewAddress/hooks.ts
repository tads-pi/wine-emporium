import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useStore from "../../zustand/store";
import { useSnackbar } from "notistack";
import { NewAddress } from "../../zustand/types";
import { useNavigate } from "react-router";
import { routes } from "../../config/routes";

interface useAddNewAddress {
    onSubmit: (address: NewAddress) => void;
    type: 'BILLING' | 'SHIPPING' | undefined | null;
    redirect: string | undefined | null;
}

interface FormData {
    state: string;
    city: string;
    neighborhood: string;
    complement: string;
    street: string;
    number: string;
    zip: string;
    type: string;
}

export default function useAddNewAddress(props: useAddNewAddress) {
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors, isValid, isDirty },
    } = useForm<FormData>();

    const { addressApi } = useStore()
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        props.onSubmit({
            country: 'Brasil',
            state: data.state,
            city: data.city,
            neighborhood: data.neighborhood,
            street: data.street,
            number: data.number,
            zip: data.zip,
            complement: data.complement,
            type: props.type ? props.type : data.type ,
        });
        if (props.redirect) {
            const payload: NewAddress = {
                country: 'Brasil',
                state: data.state,
                city: data.city,
                neighborhood: data.neighborhood,
                street: data.street,
                number: data.number,
                zip: data.zip,
                complement: data.complement,
                type: props.type ? props.type : 'SHIPPING',
            }

            await addressApi.register(payload)

            enqueueSnackbar(
                'Endereço cadastrado com sucesso!',
                { variant: 'success' },
            )

            navigate(props.redirect)
            return
        }

        if (props.onSubmit) {
            props.onSubmit({
                country: 'Brasil',
                state: data.state,
                city: data.city,
                neighborhood: data.neighborhood,
                street: data.street,
                number: data.number,
                zip: data.zip,
                complement: data.complement,
                type: props.type ? props.type : 'SHIPPING',
            });

            return
        }

        navigate(routes.ACCOUNT_ADDRESS)
    }

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

    useEffect(() =>{
        if(props.type){
            setValue('type', props.type)
        }
    }, [props.type])

    return {
        isValid,
        isDirty,
        register,
        errors,
        handleSubmit,
        onSubmit,
        setValue,
        handleZipCodeChange,
        haveZip,
    }
};