import { StateCreator } from "zustand"
import { Slices } from "../store"
import { httpClient } from "../api/httpClient"
import { Gender } from "../types"

// Essa parte do storage é responsável por todas as chamadas http para a api
export interface GenderSlice {
    getGenderOptions: () => Promise<Gender[]>
}

const createGenderSlice: StateCreator<
    Slices,
    [],
    [],
    GenderSlice
> = (set, slices) => {
    return {
        getGenderOptions: async (): Promise<Gender[]> => {
            const { data } = await httpClient.get<Gender[]>('/client/gender');
            return data;
        }
    }
}

export default createGenderSlice