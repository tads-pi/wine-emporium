import { ProductItem } from ".";
import { httpClient } from "../httpClient";

export interface ListProductsParams {
    page: number | null;
    limit: number | null;
}

export async function getStoreProducts(params: ListProductsParams): Promise<ProductItem[]> {
    const { data } = await httpClient.get<ProductItem[]>(`/product/store?page=${params.page || 1}&limit=${params.limit || 10}`);
    return data;
}
