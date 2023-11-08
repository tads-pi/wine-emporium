import { useEffect, useState } from "react"
import useStore from "../../zustand/store"
import { Product } from "../../zustand/types"

export const useStoreProductWE = (productId: string) => {
    const {
        productApi,
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

    return {
        currentProduct,
        addCartProduct,
    }
}