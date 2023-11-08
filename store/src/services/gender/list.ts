import { httpClient } from "../httpClient";

export interface GenderOption {
    id: string;
    name: string;
}

export async function getGenderOptions(): Promise<GenderOption[]> {
    const { data } = await httpClient.get<GenderOption[]>('/client/gender');
    return data;
}
