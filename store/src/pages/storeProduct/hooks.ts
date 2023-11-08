import { useEffect, useState } from "react"
import useStore from "../../zustand/store"
import { Product } from "../../zustand/types"

export const useStoreProductWE = (productId: string) => {
    const {
        productApi,
        delivererApi,
        cartApi,
    } = useStore()

    const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
    useEffect(() => {
        const fetchData = async () => {
            const response = await productApi.findById(productId)
            setCurrentProduct(response)
        }
        fetchData()
    }, [productApi])

    function addCartProduct(productId: string) {
        cartApi.addProduct(productId)
    }

    function getDeliverers(zip: string) {
        return delivererApi.listDeliverers()
    }

    return {
        currentProduct,
        addCartProduct,
        getDeliverers,
    }
}