import axios from "axios"
import { api } from "../lib/axios"
import { useQuery } from "@tanstack/react-query"

const fetchData = async (id) => {
    const response = await api.get(`/v1/store/product/${id}`)

    return response.data
}

export function useWineDataById(id) {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['winedatabyid'],
        initialData: [],
        enabled: !!id
    })

    console.log('produto por id', query)
    console.log('passei esse id aqui', id)
    return query
}