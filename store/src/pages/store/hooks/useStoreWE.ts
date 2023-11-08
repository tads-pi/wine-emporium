import { useEffect, useState } from "react"
import useStore from "../../../zustand/store"
import { Product } from "../../../zustand/types"

export default function useStoreWE() {
    const {
        productApi,
        addCartItem,
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

    function addCartItemWE(product: Product) {
        addCartItem(product, 1)
    }

    return {
        products,
        addCartItemWE,
    }
};
