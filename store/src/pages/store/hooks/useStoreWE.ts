import { useEffect, useState } from "react"
import { Product } from "../../../zustand/types"
import useStore from "../../../zustand/store"

export default function useStoreWE() {
    const {
        productApi,
        cartApi,
    } = useStore()

    const [products, setProducts] = useState<Product[] | null>(null)
    useEffect(() => {
        const fetchData = async () => {
            // TODO use paginations here
            const response = await productApi.list(1, 100)
            setProducts(response)
        }
        fetchData()
    }, [productApi])

    function addProductToCart(productId: string) {
        cartApi.addProduct(productId)
    }

    return {
        products,
        addProductToCart,
    }
};
