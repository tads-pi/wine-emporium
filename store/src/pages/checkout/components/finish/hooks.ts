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
    const [modalOpen, setModalOpen] = useState(false)

    function handleModalClose() {
        setModalOpen(false)
    }

    useEffect(() => {
        setIsLoading(true)
        checkoutApi.start().then((c) => {
            setCheckout(c)
            setIsLoading(false)
        })
    }, [checkoutApi])

    function onSubmit(e: any) {
        if (e.preventDefault) e.preventDefault()
        setModalOpen(true)

        setIsLoading(true)
        checkoutApi.finish().then(() => {
            setIsLoading(false)
        })
    }

    return {
        isLoading,
        checkout,
        modalOpen,
        handleModalClose,
        onSubmit,
    }
};
