import { StateCreator } from "zustand"
import { Slices } from "../store"
import { httpClient } from "../api/httpClient"
import { Deliverer, DelivererListResponse } from "../types"

// Essa parte do storage é responsável por todas as chamadas http para a api
export interface DelivererSlice {
    listDeliverers: () => Promise<DelivererListResponse>
}

const createDelivererSlice: StateCreator<
    Slices,
    [],
    [],
    DelivererSlice
> = (set, slices) => {
    return {
        listDeliverers: async (): Promise<DelivererListResponse> => {
            const { data } = await httpClient.post<Deliverer[]>(`/deliverer`);
            return data as DelivererListResponse;
        }
    }
}

export default createDelivererSlice