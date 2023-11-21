import { useEffect, useState } from "react"
import useStore from "../../../../zustand/store"
import { Checkout } from "../../../../zustand/types"

interface useCheckoutFinishProps {
    handleNext: () => void
}

export default function useCheckoutFinish(props: useCheckoutFinishProps) {
    const { checkoutApi } = useStore()
    const [isLoading, setIsLoading] = useState(false)
    const [checkout, setCheckout] = useState<Checkout | null>(null)

    useEffect(() => {
        setIsLoading(true)
        checkoutApi.start().then((c) => {
            setCheckout(c)
            setIsLoading(false)
        })
    }, [checkoutApi])

    function onSubmit(e: any) {
        if (e.preventDefault) e.preventDefault()

        alert(`O número do seu pedido é: #${checkout?.sequentialId}.`)
        setIsLoading(true)
        checkoutApi.finish().then(() => {
            setIsLoading(false)
            props.handleNext()
        })
    }

    return {
        isLoading,
        checkout,
        onSubmit,
    }
};
