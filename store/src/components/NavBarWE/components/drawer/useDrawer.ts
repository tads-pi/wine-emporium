import { useNavigate } from "react-router-dom";
import useStore from "../../../../zustand/store";
import { routes } from "../../../../config/routes";

export default function useDrawer() {
    const {
        isLoggedIn,
        cartApi,
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
    }


    return {
        cartState,
        getCart,
        addProduct,
        removeProduct,
        navigate,
        handleGoToCheckout
    }
};
