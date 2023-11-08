import { StateCreator, create } from 'zustand';
import createAuthSlice, { AuthSlice } from './slices/authSlice';
import createAddressSlice, { AddressSlice } from './slices/addressSlice';
import createCartSlice, { CartSlice } from './slices/cartSlice';
import createCheckoutSlice, { CheckoutSlice } from './slices/checkoutSlice';
import createDelivererSlice, { DelivererSlice } from './slices/delivererSlice';
import createGenderSlice, { GenderSlice } from './slices/genderSlice';
import createPaymentSlice, { PaymentSlice } from './slices/paymentSlice';
import createProductSlice, { ProductSlice } from './slices/productSlice';

export interface AppSlice {
    isLoggedIn: boolean
    setIsLoggedIn: (isLoggedIn: boolean) => void

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
const useStore = create<Slices>()((...a) => ({
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
}))

export default useStore