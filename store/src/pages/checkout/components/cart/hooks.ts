import { useEffect, useState } from "react";
import { Address, Checkout, Deliverer } from "../../../../zustand/types";
import useStore from "../../../../zustand/store"

interface CheckoutCartProps {
    handleNext: () => void
}

export default function useCheckoutCart(props: CheckoutCartProps) {
    const {
        delivererApi,
        checkoutApi,
        addressApi,
        cartApi,
    } = useStore()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    function onSubmit(e: any) {
        if (e.preventDefault) e.preventDefault()
        if (!checkout || !selectedAddress || !selectedDeliverer) return

        setIsLoading(true)
        checkoutApi.setAddress(checkout.id, selectedAddress.id)
            .then(() => {
                checkoutApi.setDeliverer(checkout.id, selectedDeliverer.id)
                    .then(() => {
                        setIsLoading(false)
                        props.handleNext()
                    })
            })
    }

    const [checkout, setCheckout] = useState<Checkout | null>(null)
    useEffect(() => {
        checkoutApi.start().then((c) => {
            setCheckout(c)

            if (c.deliverer) {
                setSelectedDeliverer(c.deliverer)
            }
        })
    }, [cartApi])

    async function addProductToCart(productId: string): Promise<void> {
        return new Promise((resolve) => {
            cartApi.addProduct(productId)
                .then(() => {
                    checkoutApi.start().then(setCheckout)
                    resolve()
                })
        })

    }

    async function removeProductFromCart(productId: string): Promise<void> {
        return new Promise((resolve) => {
            cartApi.removeProduct(productId)
                .then(() => {
                    checkoutApi.start().then(setCheckout)
                    resolve()
                })
        })
    }

    // Address
    const [selectedAddress, setAddress] = useState<Address | null>(null)
    function setSelectedAddress(address: Address): void {
        setAddress(address)
    }

    const [addresses, setAddresses] = useState<Address[]>([])
    useEffect(() => {
        addressApi.findAll().then((a) => {
            setAddresses(a)
            setSelectedAddress(a[0])
        })
    }, [addressApi])

    // Deliverers
    const [selectedDeliverer, setDeliverer] = useState<Deliverer | null>(null)
    function setSelectedDeliverer(deliverer: Deliverer): void {
        setDeliverer(deliverer)
    }

    const [deliverers, setDeliverers] = useState<Deliverer[]>([])
    useEffect(() => {
        delivererApi.listDeliverers().then(setDeliverers)
    }, [checkoutApi])

    return {
        isLoading,
        checkout,
        addresses,
        addProductToCart,
        removeProductFromCart,
        selectedAddress,
        setSelectedAddress,
        selectedDeliverer,
        setSelectedDeliverer,
        deliverers,
        onSubmit,
    }
};
