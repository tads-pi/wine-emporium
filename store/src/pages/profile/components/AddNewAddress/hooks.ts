import useStore from "../../../../zustand/store";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { NewAddress } from "../../../../zustand/types";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../../config/routes";

export default function useProfileWEAddressAddNewAddress() {
    const navigate = useNavigate()
    const { addressApi } = useStore()
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(address: NewAddress) {
        try {
            setIsLoading(true);
            addressApi.register(address)
                .then(() => {
                    enqueueSnackbar(
                        'Endereço cadastrado com sucesso!',
                        { variant: 'success' },
                    )

                    navigate(routes.ACCOUNT_ADDRESS)
                })
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

    return {
        isLoading,
        onSubmit,
    }
};
