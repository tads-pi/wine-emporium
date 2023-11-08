import { StateCreator } from "zustand"
import { Slices } from "../store"
import { httpClient } from "../api/httpClient"
import { Cart, UpdateCartPayload } from "../types"

// Essa parte do storage é responsável por todas as chamadas http para a api
export interface CartSlice {
    getCart: () => Promise<Cart>
    updateCart: (payload: UpdateCartPayload) => Promise<void>
    getCartPrice: () => Promise<number>
}

const createCartSlice: StateCreator<
    Slices,
    [],
    [],
    CartSlice
> = (set, slices) => {
    return {
        getCart: async (): Promise<Cart> => {
            const { data } = await httpClient.get<Cart>('/client/cart');
            return data;
        },
        updateCart: async (payload: UpdateCartPayload): Promise<void> => {
            await httpClient.put('/client/cart', payload);
        },
        getCartPrice: async (): Promise<number> => {
            const { data } = await httpClient.get<number>('/client/cart/price');
            return data
        },
    }
}

export default createCartSlice