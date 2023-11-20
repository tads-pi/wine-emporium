import { useEffect, useState } from "react"
import useStore from "../../../../zustand/store"
import { Address, NewAddress } from "../../../../zustand/types"
import { useSnackbar } from "notistack"
import { useNavigate } from "react-router-dom"
import { routes } from "../../../../config/routes"

export default function useAddressInfo() {
    const { addressApi } = useStore()
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)

    const [userAddresses, setUserAddresses] = useState<Address[]>([])
    const [haveRegisteredDeliveryAddress, setHaveDeliveryAddress] = useState<boolean>(false)
    useEffect(() => {
        addressApi.findAll()
            .then(setUserAddresses)
    }, [addressApi])

    function haveAnyAddress() {
        return userAddresses.length > 0
    }
    function haveDeliveryAddress() {
        return haveRegisteredDeliveryAddress
    }

    async function saveInvoiceAddress(address: NewAddress) {
        setIsLoading(true)
        addressApi.register(address)
            .then(() => {
                enqueueSnackbar(
                    "Endereço de Faturamento salvo com sucesso!",
                    { variant: 'success' }
                )
                // Atualiza hook de endereços
                addressApi.findAll().then((data) => {
                    setUserAddresses(data)
                    setIsLoading(false)
                })
            })
            .catch(() => {
                enqueueSnackbar(
                    "Ops... Não foi possível salvar seu endereço.",
                    { variant: 'error' }
                )
                setIsLoading(false)
            })
    }

    async function saveDeliveryAddress(address: NewAddress) {
        setIsLoading(true)
        addressApi.register(address)
            .then(() => {
                enqueueSnackbar(
                    "Endereço de Entregas salvo sucesso!",
                    { variant: 'success' }
                )
                setIsLoading(false)
                setHaveDeliveryAddress(true)
            })
            .catch(() => {
                enqueueSnackbar(
                    "Ops... Não foi possível salvar seu endereço.",
                    { variant: 'error' }
                )
                setIsLoading(false)
            })
    }

    async function onSubmit() {
        if (haveAnyAddress()) {
            if (optUseSameAddress) {
                await saveDeliveryAddress(userAddresses[0])
            }
            navigate(routes.LOGIN)
        }
    }

    const [optUseSameAddress, setOptUseSameAddress] = useState(false)

    return {
        isLoading,
        haveAnyAddress,
        haveDeliveryAddress,
        saveInvoiceAddress,
        saveDeliveryAddress,
        onSubmit,
        optUseSameAddress,
        setOptUseSameAddress,
    }
};
