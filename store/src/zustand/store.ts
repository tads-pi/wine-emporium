import { StateCreator, create } from 'zustand';
import createAuthSlice, { AuthSlice } from './slices/authSlice';
import createAddressSlice, { AddressSlice } from './slices/addressSlice';
import createCartSlice, { CartSlice } from './slices/cartSlice';
import createCheckoutSlice, { CheckoutSlice } from './slices/checkoutSlice';
import createDelivererSlice, { DelivererSlice } from './slices/delivererSlice';
import createGenderSlice, { GenderSlice } from './slices/genderSlice';
import createPaymentSlice, { PaymentSlice } from './slices/paymentSlice';
import createProductSlice, { ProductSlice } from './slices/productSlice';
import { CartItem, Product } from './types';
import { localStorageKeys } from '../config/localStorageKeys';
import { persist } from 'zustand/middleware'

export interface AppSlice {
    isLoggedIn: boolean
    setIsLoggedIn: (isLoggedIn: boolean) => void
    signOut: () => void

    cartItems: CartItem[]
    addCartItem: (product: Product, amount: number | null) => void
    removeCartItem: (itemIndex: number) => void
}

const createAppSlice: StateCreator<
    Slices,
    [],
    [],
    AppSlice
> = (set, slices) => {
    // initial slice state
    return {
        isLoggedIn: false,
        setIsLoggedIn: (isLoggedIn: boolean) => {
            set({ isLoggedIn })
        },
        signOut: () => {
            localStorage.removeItem(localStorageKeys.ACCESS_TOKEN)
            slices().setIsLoggedIn(false)
        },

        // 

        cartItems: [],
        addCartItem: (product: Product, amount: number | null) => {
            const newItem: CartItem = {
                product,
                amount: amount || 1,
            }
            set((state) => {
                return {
                    cartItems: [...state.cartItems, newItem]
                }
            })
        },
        removeCartItem: (itemIndex: number) => set((state) => {
            state.cartItems.splice(itemIndex, 1)
            return { cartItems: state.cartItems }
        }),
    }
}

export type Slices = {
    authApi: AuthSlice
    addressApi: AddressSlice
    cartApi: CartSlice
    checkoutApi: CheckoutSlice
    delivererApi: DelivererSlice
    genderApi: GenderSlice
    paymentApi: PaymentSlice
    productApi: ProductSlice
} & AppSlice

// Une todos os slices em um único store
// TODO descobrir como usar persist aqui pra salvar tudo no local storage
// doc: https://docs.pmnd.rs/zustand/integrations/persisting-store-data
const useStore = create<Slices>()(
    (...a) => ({
        ...createAppSlice(...a),
        authApi: {
            ...createAuthSlice(...a)
        },
        addressApi: {
            ...createAddressSlice(...a),
        },
        cartApi: {
            ...createCartSlice(...a),
        },
        checkoutApi: {
            ...createCheckoutSlice(...a),
        },
        delivererApi: {
            ...createDelivererSlice(...a),
        },
        genderApi: {
            ...createGenderSlice(...a),
        },
        paymentApi: {
            ...createPaymentSlice(...a),
        },
        productApi: {
            ...createProductSlice(...a),
        },
    }
    ))

export default useStore