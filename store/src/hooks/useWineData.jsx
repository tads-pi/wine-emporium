import axios from "axios"
import { api } from "../lib/axios"
import { useQuery } from "@tanstack/react-query"

const fetchData = async () => {
    const response = await api.get('/v1/store/product')

    return response.data.products
}

export function useWineData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['winedata'],
        initialData: [],
    })

    console.log(query)
    return query
}