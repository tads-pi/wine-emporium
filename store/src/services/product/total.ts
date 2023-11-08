import { httpClient } from "../httpClient";

export async function getTotalStoreProducts(): Promise<number> {
    const { data } = await httpClient.get<number>('/product/store/total');
    return data;
}
