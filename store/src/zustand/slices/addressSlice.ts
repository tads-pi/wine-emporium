import { StateCreator } from "zustand"
import { Slices } from "../store"
import { httpClient } from "../api/httpClient"
import { Address } from "../types"

// Essa parte do storage é responsável por todas as chamadas http para a api
export interface AddressSlice {
    findAll: () => Promise<Address[]>
    findById: (id: string) => Promise<Address>
    delete: (id: string) => Promise<void>
    mark: (id: string) => Promise<void>
    register: (address: Address) => Promise<void>
}

const createAddressSlice: StateCreator<
    Slices,
    [],
    [],
    AddressSlice
> = (set, slices) => {
    return {
        findAll: async (): Promise<Address[]> => {
            const { data } = await httpClient.get<Address[]>('/client/address');
            return data
        },
        findById: async (id: string): Promise<Address> => {
            const { data } = await httpClient.get<Address>(`/client/address/${id}`);
            return data
        },
        delete: async (id: string): Promise<void> => {
            await httpClient.delete(`/client/address/${id}`);
        },
        mark: async (id: string): Promise<void> => {
            await httpClient.post(`/client/address/${id}/mark`);
        },
        register: async (address: Address): Promise<void> => {
            await httpClient.post('/client/address', address);
        },
    }
}

export default createAddressSlice