import { useEffect, useState } from "react";
import { Address } from "../../../../zustand/types";
import useStore from "../../../../zustand/store";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../../config/routes";

export default function useProfileWEAddress() {
    const { addressApi } = useStore();
    const navigate = useNavigate();

    const [addresses, setAddresses] = useState<Address[] | null>(null)
    useEffect(() => {
        addressApi.findAll().then(setAddresses)
    }, [addressApi])

    function goToAddNewAddress() {
        navigate(routes.ACCOUNT_ADDRESS_NEW_ADDRESS)
    }

    function deleteAddress(address: Address) {
        confirm("Tem certeza que deseja deletar esse endereço?") &&
            addressApi.delete(address.id).then(() => {
                setAddresses(addresses?.filter(a => a.id !== address.id) ?? null)
            })
    }

    function markAddress(address: Address) {
        addressApi.mark(address.id).then(() => {
            setAddresses(addresses?.map(a => {
                if (a.id === address.id) {
                    return { ...a, marked: true }
                }
                return { ...a, marked: false }
            }) ?? null)
        })
    }

    return {
        addresses,
        goToAddNewAddress,
        deleteAddress,
        markAddress,
    }
};
