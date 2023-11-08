import { StateCreator } from "zustand"
import { Slices } from "../store"
import { httpClient } from "../api/httpClient";
import { Address, Checkout, Deliverer, Payment } from "../types";

// Essa parte do storage é responsável por todas as chamadas http para a api
export interface CheckoutSlice {
    cancelCheckout: (id: string) => Promise<void>
    findById: (id: string) => Promise<Checkout>
    list: (id: string) => Promise<Checkout[]>
    listDeliverer: (checkoutId: string) => Promise<Checkout[]>
    price: (id: string) => Promise<number>
    setAddress: (id: string, address: Address) => Promise<void>
    setDeliverer: (id: string, deliverer: Deliverer) => Promise<void>
    setPayment: (id: string, payment: Payment) => Promise<void>
    start: (id: string) => Promise<void>
}

const createCheckoutSlice: StateCreator<
    Slices,
    [],
    [],
    CheckoutSlice
> = (set, slices) => {
    return {
        cancelCheckout: async (id: string): Promise<void> => {
            await httpClient.delete(`/checkout/${id}`);
        },
        findById: async (id: string): Promise<Checkout> => {
            const { data } = await httpClient.get<Checkout>(`/checkout/${id}`);
            return data
        },
        list: async (): Promise<Checkout[]> => {
            const { data } = await httpClient.get<Checkout[]>('/checkout');
            return data
        },
        listDeliverer: async (checkoutId: string): Promise<Checkout[]> => {
            const { data } = await httpClient.get<Checkout[]>(`/checkout/${checkoutId}/deliverer`);
            return data
        },
        price: async (id: string): Promise<number> => {
            const { data } = await httpClient.get<number>(`/checkout/${id}/price`);
            return data
        },
        setAddress: async (id: string, address: Address): Promise<void> => {
            await httpClient.post(`/checkout/${id}/address`, address);
        },
        setDeliverer: async (id: string, deliverer: Deliverer): Promise<void> => {
            await httpClient.post(`/checkout/${id}/deliverer`, deliverer);
        },
        setPayment: async (id: string, payment: Payment): Promise<void> => {
            await httpClient.post(`/checkout/${id}/payment`, payment);
        },
        start: async (id: string): Promise<void> => {
            await httpClient.post(`/checkout/${id}/start`);
        },
    }
}

export default createCheckoutSlice