import { useEffect, useState } from "react"
import useStore from "../../../../zustand/store"
import { Checkout } from "../../../../zustand/types"
import { useSnackbar } from "notistack"
import { routes } from "../../../../config/routes"
import { useNavigate } from "react-router-dom"

interface useProfileWECheckoutDetailsProps {
    checkoutId: string | undefined
}

export default function useProfileWECheckoutDetails(props: useProfileWECheckoutDetailsProps) {
    const { checkoutApi } = useStore()
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()

    const [checkout, setCheckout] = useState<Checkout | null>(null)
    useEffect(() => {
        if (!props.checkoutId) {
            enqueueSnackbar('Pedido não encontrado', { variant: 'error' })
            return
        }
        checkoutApi.findById(props.checkoutId).then(setCheckout)
    }, [checkoutApi])

    function goBack() {
        navigate(routes.ACCOUNT_CHECKOUTS)
    }

    return {
        checkout,
        goBack
    }
};
