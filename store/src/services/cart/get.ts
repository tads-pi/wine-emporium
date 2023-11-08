import { httpClient } from "../httpClient";
import { ProductItem } from "../product";

export interface GetCartRequest { }

export interface GetCartResponse {
    id: string;
    products: ProductItem[];
}

export async function getCart(params: GetCartRequest) {
    const { data } = await httpClient.get<GetCartResponse>('/client/cart');
    return data;
}
