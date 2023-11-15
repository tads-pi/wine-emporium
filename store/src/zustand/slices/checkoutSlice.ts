import { StateCreator } from "zustand"
import { Slices } from "../store"
import { httpClient } from "../api/httpClient";
import { Address, Checkout, Deliverer, Payment } from "../types";

// Essa parte do storage é responsável por todas as chamadas http para a api
export interface CheckoutSlice {
    findById: (id: string) => Promise<Checkout>
    list: (id: string) => Promise<Checkout[]>
    listDeliverer: (checkoutId: string) => Promise<Checkout[]>
    listStatus: () => Promise<string[]>
    price: (id: string) => Promise<number>
    setAddress: (id: string, addressId: string) => Promise<Checkout>
    setDeliverer: (id: string, delivererId: string) => Promise<Checkout>
    setPayment: (id: string, payment: Payment) => Promise<Checkout>
    start: () => Promise<Checkout>
    cancel: () => Promise<Checkout>
    finish: () => Promise<Checkout>
}

const createCheckoutSlice: StateCreator<
    Slices,
    [],
    [],
    CheckoutSlice
> = (set, slices) => {
    return {
        findById: async (id: string): Promise<Checkout> => {
            const { data } = await httpClient.get<Checkout>(`/checkout/find/${id}`);
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
        listStatus: async (): Promise<string[]> => {
            const { data } = await httpClient.get<string[]>(`/checkout/status`);
            return data
        },
        price: async (id: string): Promise<number> => {
            const { data } = await httpClient.get<number>(`/checkout/${id}/price`);
            return data
        },
        setAddress: async (id: string, addressId: string): Promise<Checkout> => {
            const { data } = await httpClient.post<Checkout>(`/checkout/${id}/address/${addressId}`);
            return data
        },
        setDeliverer: async (id: string, delivererId: string): Promise<Checkout> => {
            const { data } = await httpClient.post<Checkout>(`/checkout/${id}/deliverer/${delivererId}`);
            return data
        },
        setPayment: async (id: string, payment: Payment): Promise<Checkout> => {
            const { data } = await httpClient.post<Checkout>(`/checkout/${id}/payment`, payment);
            return data
        },
        start: async (): Promise<Checkout> => {
            const { data } = await httpClient.post<Checkout>(`/checkout/start`);
            return data
        },
        cancel: async (): Promise<Checkout> => {
            const { data } = await httpClient.delete<Checkout>(`/checkout/cancel`);
            return data
        },
        finish: async (): Promise<Checkout> => {
            const { data } = await httpClient.post<Checkout>(`/checkout/finish`);
            return data
        },
    }
}

export default createCheckoutSlice