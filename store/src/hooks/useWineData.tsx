import axios from "axios"
import { api } from "../lib/axios"
import { useQuery } from "@tanstack/react-query"

const fetchData = async () => {
    const response = await api.get('/v1/store/product')

    return response?.data?.data
}

export function useWineData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['wine-data'],
        initialData: []
    })

    return query
}