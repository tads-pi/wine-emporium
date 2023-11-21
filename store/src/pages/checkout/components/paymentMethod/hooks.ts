import { useEffect, useState } from "react"
import { Checkout, CheckoutPaymentMethodPayload, CreditCard } from "../../../../zustand/types"
import useStore from "../../../../zustand/store"

interface useCheckoutPaymentMethodProps {
    handleNext: () => void
}

export default function useCheckoutPaymentMethod(props: useCheckoutPaymentMethodProps) {
    const {
        checkoutApi,
        paymentApi,
    } = useStore()

    type validType = 'credit-card' | 'bank-slip'
    const [selected, setSelected] = useState<validType | null>(null)
    const [installments, setInstallments] = useState<number>(1)

    const [checkout, setCheckout] = useState<Checkout | null>(null)
    useEffect(() => {
        checkoutApi.start().then(setCheckout)
    }, [checkoutApi])

    const [creditCard, setCreditCard] = useState<CreditCard | null>(null)
    const [userCreditCards, setUserCreditCards] = useState<CreditCard[]>([])
    useEffect(() => {
        paymentApi.listCreditCards().then(setUserCreditCards)
    }, [paymentApi])

    function onSubmit(e: any) {
        if (e.preventDefault) e.preventDefault()
        if (!checkout || !selected) return

        const payload: CheckoutPaymentMethodPayload = {
            paymentMethod: selected,
            methodId: creditCard?.id || '',
            installments,
            installmentsValue: Number(Number(checkout.price / installments).toFixed(2)),
            dueDate: new Date().getDate(),
        }
        checkoutApi.setPayment(checkout.id, payload)
            .then(() => {
                props.handleNext()
            })
    }

    return {
        checkout,
        selected,
        setSelected,
        installments,
        setInstallments,
        creditCard,
        setCreditCard,
        userCreditCards,
        onSubmit,
    }
};
