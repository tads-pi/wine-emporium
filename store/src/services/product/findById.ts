import { ProductItem } from ".";
import { httpClient } from "../httpClient";

export async function getProductById(id: string): Promise<ProductItem> {
    const { data } = await httpClient.get<ProductItem>(`/product/store/${id}`);
    return data;
}
