import { useNavigate } from "react-router-dom";
import useStore from "../../zustand/store";
import { routes } from "../../config/routes";


export default function useCartCheckout() {
    const {
        authApi,
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
        if (!authApi.isLoggedIn) {
            navigate(routes.LOGIN)
            return
        }
        navigate(routes.CHECKOUT)
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
