import { StateCreator } from "zustand"
import { Slices } from "../store"
import { httpClient } from "../api/httpClient"

// Essa parte do storage é responsável por todas as chamadas http para a api
export interface PaymentSlice {

}

const createPaymentSlice: StateCreator<
    Slices,
    [],
    [],
    PaymentSlice
> = (set, slices) => {
    return {

    }
}

export default createPaymentSlice