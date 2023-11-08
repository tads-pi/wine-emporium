import { httpClient } from "../httpClient";

export interface GetCartRequest { }

export interface GetCartResponse {
    id: string;
    products: CartProduct[];
}

// TODO move to products folder
export interface CartProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    ratings: number;
    images: ProductImage[];
    amount: number;
}

export interface ProductImage {
    id: string
    url: string
    marked: boolean
}

export async function getCart(params: GetCartRequest) {
    const { data } = await httpClient.get<GetCartResponse>('/client/cart');
    return data;
}
