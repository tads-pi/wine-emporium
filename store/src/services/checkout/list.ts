import { httpClient } from "../httpClient";

export interface CheckoutItem {
    id: string;
    status: string;
    cart: {
        id: string;
        products: CartProduct[];
    };
    deliverer: {
        id: string;
        name: string;
        fare: number;
    };
    address: {
        id: string;
        country: string;
        state: string;
        city: string;
        neighborhood: string;
        street: string;
        number: string;
        zip: string;
        complement: string;
        marked: boolean;
    };
    price: number;
}

export async function getCheckouts(): Promise<CheckoutItem[]> {
    const { data } = await httpClient.get<CheckoutItem[]>('/checkout');
    return data;
}
