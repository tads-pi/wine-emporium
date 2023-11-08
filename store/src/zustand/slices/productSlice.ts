import { StateCreator } from "zustand"
import { Slices } from "../store"
import { httpClient } from "../api/httpClient"
import { Product } from "../types"

// Essa parte do storage é responsável por todas as chamadas http para a api
export interface ProductSlice {
    list: (page: number | null, limit: number | null) => Promise<Product[]>
    findById: (id: string) => Promise<Product>
    total: () => Promise<number>
}

const createProductSlice: StateCreator<
    Slices,
    [],
    [],
    ProductSlice
> = (set, slices) => {
    return {
        list: async (page: number | null, limit: number | null): Promise<Product[]> => {
            const { data } = await httpClient.get<Product[]>(`/product/store?page=${page || 1}&limit=${limit || 10}`);
            return data;
        },
        findById: async (id: string): Promise<Product> => {
            const { data } = await httpClient.get<Product>(`/product/store/${id}`);
            return data;
        },
        total: async (): Promise<number> => {
            const { data } = await httpClient.get<number>('/product/store/total');
            return data;
        }
    }
}

export default createProductSlice