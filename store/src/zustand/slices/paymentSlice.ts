import { StateCreator } from "zustand"
import { Slices } from "../store"
import { httpClient } from "../api/httpClient"
import { CreditCard, NewCreditCard } from "../types"

// Essa parte do storage é responsável por todas as chamadas http para a api
export interface PaymentSlice {
    listCreditCards: () => Promise<CreditCard[]>
    createCreditCard: (payload: NewCreditCard) => Promise<CreditCard>
    deleteCreditCard: (cardId: string) => Promise<void>
}

const createPaymentSlice: StateCreator<
    Slices,
    [],
    [],
    PaymentSlice
> = (set, slices) => {
    return {
        listCreditCards: async (): Promise<CreditCard[]> => {
            const { data } = await httpClient.get<CreditCard[]>('/client/credit-card')
            return data
        },
        createCreditCard: async (payload: NewCreditCard): Promise<CreditCard> => {
            const { data } = await httpClient.post<CreditCard>('/client/credit-card', payload)
            return data
        },
        deleteCreditCard: async (cardId: string): Promise<void> => {
            await httpClient.delete(`/client/credit-card/${cardId}`)
        },
    }
}

export default createPaymentSlice