import { Deliverer, DelivererListResponse } from ".";
import { httpClient } from "../httpClient";

export interface ProductDeliverersRequest {
    productId: string
    zip: string
}

export async function getProductDeliverers(params: ProductDeliverersRequest): Promise<DelivererListResponse> {
    const { data } = await httpClient.post<Deliverer[]>(`/product/deliverer`, params);
    return data as DelivererListResponse;
}
