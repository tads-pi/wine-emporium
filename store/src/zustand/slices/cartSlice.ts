import { StateCreator } from "zustand"
import { Slices } from "../store"
import { httpClient } from "../api/httpClient"
import { Cart, CartProduct, UpdateCartPayload } from "../types"

// Essa parte do storage é responsável por todas as chamadas http para a api
export interface CartSlice {
    cartState: Cart | null
    getCart: () => Promise<Cart>
    addProduct: (productId: string) => Promise<void>
    removeProduct: (productId: string) => Promise<void>
}

const createCartSlice: StateCreator<
    Slices,
    [],
    [],
    CartSlice
> = (set, slices) => {
    return {
        cartState: null,
        getCart: async (): Promise<Cart> => {
            const { data } = await httpClient.get<Cart>('/client/cart');
            const { data: price } = await httpClient.get<number>('/client/cart/price');

            slices().cartApi.cartState = {
                ...data,
                price: price,
            }
            return data;
        },
        addProduct: async (productId: string): Promise<void> => {
            await httpClient.put(`/client/cart/${productId}`);
            slices().cartApi.getCart()
        },
        removeProduct: async (productId: string): Promise<void> => {
            await httpClient.delete(`/client/cart/${productId}`);
            slices().cartApi.getCart()
        },
    }
}

export default createCartSlice