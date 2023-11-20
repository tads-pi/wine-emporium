import { useEffect, useState } from "react"
import { ListProductsParams, Product } from "../../../zustand/types"
import useStore from "../../../zustand/store"
import { set } from "react-hook-form"

export default function useStoreWE() {
    const {
        productApi,
        cartApi,
    } = useStore()

    const [products, setProducts] = useState<Product[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    useEffect(() => {
        const fetchData = async () => {
            // TODO use paginations here
            const response = await productApi.list()
            setProducts(response)
        }
        fetchData()
    }, [productApi])

    function addProductToCart(productId: string) {
        cartApi.addProduct(productId)
    }

    async function fetchProducts(input: ListProductsParams) {
        setIsLoading(true)
        productApi.list(input)
            .then((data) => {
                setProducts(data)
                setIsLoading(false)
            })
    }

    // Search
    const [searchValue, setSearchValue] = useState<string>('')
    const handleSearch = (e: any) => {
        fetchProducts({ name: searchValue })
    }

    return {
        products,
        isLoading,
        addProductToCart,
        fetchProducts,
        searchValue,
        setSearchValue,
        handleSearch,
    }
};
