import { StateCreator, create } from 'zustand';
import createAuthSlice, { AuthSlice } from './slices/authSlice';
import createAddressSlice, { AddressSlice } from './slices/addressSlice';
import createCartSlice, { CartSlice } from './slices/cartSlice';
import createCheckoutSlice, { CheckoutSlice } from './slices/checkoutSlice';
import createDelivererSlice, { DelivererSlice } from './slices/delivererSlice';
import createGenderSlice, { GenderSlice } from './slices/genderSlice';
import createPaymentSlice, { PaymentSlice } from './slices/paymentSlice';
import createProductSlice, { ProductSlice } from './slices/productSlice';
import createRegisterSlice, { RegisterSlice } from './slices/registerSlice';

export interface AppSlice {
}

const createAppSlice: StateCreator<
    Slices,
    [],
    [],
    AppSlice
> = (set, slices) => {
    // initial slice state
    return {
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
    registerApi: RegisterSlice
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
        registerApi: {
            ...createRegisterSlice(...a),
        }
    }
    ))

export default useStore