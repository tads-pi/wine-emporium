import { useEffect, useState } from "react"
import useStore from "../../zustand/store"
import { Product } from "../../zustand/types"

export const useStoreProductWE = (productId: string) => {
    const {
        addCartItem,
        productApi,
    } = useStore()
    console.log({ productApi });

    const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
    useEffect(() => {
        const fetchData = async () => {
            const response = await productApi.findById(productId)
            setCurrentProduct(response)
        }
        fetchData()
    }, [productApi])

    return {
        currentProduct,
        addCartItem,
    }
}