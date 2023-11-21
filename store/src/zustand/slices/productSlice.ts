import { StateCreator } from "zustand"
import { Slices } from "../store"
import { httpClient } from "../api/httpClient"
import { ListProductsParams, Product, ProductTotals } from "../types"

// Essa parte do storage é responsável por todas as chamadas http para a api
export interface ProductSlice {
    list: (input?: ListProductsParams) => Promise<Product[]>
    findById: (id: string) => Promise<Product>
    totals: () => Promise<ProductTotals>
    listCategories: () => Promise<string[]>
}

const createProductSlice: StateCreator<
    Slices,
    [],
    [],
    ProductSlice
> = (set, slices) => {
    return {
        list: async (input?: ListProductsParams): Promise<Product[]> => {
            if (!input) {
                const { data } = await httpClient.get<Product[]>(`/product/store?page=1&limit=10`);
                return data;
            }

            const params = new URLSearchParams(Object.entries({
                page: input.page?.toString() || '1',
                limit: input.limit?.toString() || '10',
            }));

            const headers: any = {}
            if (input.name) {
                headers['name'] = input.name
            }
            if (input.category && input.category !== 'TODOS') {
                headers['category'] = input.category
            }
            if (input.sort) {
                headers['sort'] = `${input.sort.field}:${input.sort.order}`
            }
            if (input.priceFrom && input.priceFrom > 0) {
                headers['price-from'] = input.priceFrom
            }
            if (input.priceTo && input.priceTo > 0) {
                headers['price-to'] = input.priceTo
            }
            if (input.ratingsFrom) {
                headers['ratings-from'] = input.ratingsFrom
            }
            if (input.ratingsTo) {
                headers['ratings-to'] = input.ratingsTo
            }

            const { data } = await httpClient.get<Product[]>(`/product/store?${params.toString()}`, { headers });
            return data;
        },
        findById: async (id: string): Promise<Product> => {
            const { data } = await httpClient.get<Product>(`/product/store/${id}`);
            return data;
        },
        totals: async (): Promise<ProductTotals> => {
            const { data } = await httpClient.get<ProductTotals>('/product/store/total');
            return data;
        },
        listCategories: async (): Promise<string[]> => {
            const { data } = await httpClient.get<string[]>('/product/categories');
            return data;
        }
    }
}

export default createProductSlice