import { useSnackbar } from "notistack";
import useStore from "../../../../zustand/store";
import { useNavigate } from "react-router-dom";
import { Checkout } from "../../../../zustand/types";
import { routes } from "../../../../config/routes";
import { useEffect, useState } from "react";

export default function useProfileWECheckout() {
    const { checkoutApi } = useStore();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [checkouts, setCheckouts] = useState<Checkout[] | null>(null)
    useEffect(() => {
        checkoutApi.list().then(setCheckouts)
    }, [checkoutApi])

    function goToCheckoutResume(checkout: Checkout) {
        navigate(routes.ACCOUNT_CHECKOUT_BY_ID.replace(':id', checkout.id))
    }

    function goHome() {
        navigate(routes.STORE)
    }

    return {
        checkouts,
        goToCheckoutResume,
        goHome,
    }
};
