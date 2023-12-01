import { StateCreator } from "zustand"
import { Slices } from "../store"
import { httpClient } from "../api/httpClient"
import { Cart, CartProduct, UpdateCartPayload } from "../types"

const emptyCard: Cart = {
    id: '',
    products: [],
    price: 0,
}

// Essa parte do storage é responsável por todas as chamadas http para a api
export interface CartSlice {
    cartState: Cart
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
        cartState: emptyCard,
        getCart: async (): Promise<Cart> => {
            if (slices().authApi.isLoggedIn) {
                const { data } = await httpClient.get<Cart>('/client/cart');
                const { data: price } = await httpClient.get<number>('/client/cart/price');

                slices().cartApi.cartState = {
                    ...data,
                    price: price,
                }
                return data;
            }

            slices().cartApi.cartState.products = slices().cartApi.cartState.products = slices().cartApi.cartState.products.filter(p => p.amount > 0)

            let price: number = 0
            slices().cartApi.cartState.products.map(p => price += p.price * p.amount)
            slices().cartApi.cartState.price = Number(Number(price).toFixed(2))
            slices().cartApi.cartState.id = '1'
            return slices().cartApi.cartState
        },
        addProduct: async (productId: string): Promise<void> => {
            if (slices().authApi.isLoggedIn) {
                await httpClient.put(`/client/cart/${productId}`);
                slices().cartApi.getCart()
            }

            const product = await slices().productApi.findById(productId)
            const previousAmount = slices().cartApi.cartState.products.filter(p => p.id === productId)[0]?.amount || 0

            slices().cartApi.cartState.products = [
                ...slices().cartApi.cartState.products.filter(p => p.id !== productId),
                {
                    ...product,
                    amount: previousAmount + 1,
                }
            ]

            slices().cartApi.getCart()
        },
        removeProduct: async (productId: string): Promise<void> => {
            if (slices().authApi.isLoggedIn) {
                await httpClient.delete(`/client/cart/${productId}`);
                slices().cartApi.getCart()
            }

            const product = await slices().productApi.findById(productId)
            slices().cartApi.cartState.products = [
                ...slices().cartApi.cartState.products.filter(p => p.id !== productId),
                {
                    ...product,
                    amount: slices().cartApi.cartState.products.filter(p => p.id === productId)[0].amount - 1,
                }
            ]
            slices().cartApi.getCart()
        },
    }
}

export default createCartSlice