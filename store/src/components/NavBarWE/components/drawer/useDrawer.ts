import { useNavigate } from "react-router-dom";
import useStore from "../../../../zustand/store";
import { routes } from "../../../../config/routes";
import { Deliverer } from "../../../../zustand/types";
import { useEffect, useState } from "react";

export default function useDrawer() {
    const {
        authApi: {
            isLoggedIn,
        },
        cartApi,
        delivererApi,
    } = useStore()

    const {
        cartState,
        getCart,
        addProduct,
        removeProduct,
    } = cartApi

    const navigate = useNavigate()

    function handleGoToCheckout() {
        if (!isLoggedIn) {
            navigate(routes.LOGIN)
            return
        }
        navigate(routes.CHECKOUT)
    }

    // Deliverers
    const [deliverers, setDeliverers] = useState<Deliverer[]>([])
    useEffect(() => {
        delivererApi.listDeliverers().then(setDeliverers)
    }, [delivererApi])

    const [zipCode, setZipCode] = useState<string>('')
    const [selectedDeliverer, setSelectedDeliverer] = useState<Deliverer | null>(null)

    return {
        isLoggedIn,
        cartState,
        getCart,
        addProduct,
        removeProduct,
        navigate,
        handleGoToCheckout,
        deliverers,
        zipCode,
        setZipCode,
        selectedDeliverer,
        setSelectedDeliverer,
    }
};
