import { Deliverer, DelivererListResponse } from ".";
import { httpClient } from "../httpClient";

export interface ListDeliverersRequest {
    checkoutId: string
}

export async function getCheckoutDelivererOptions(params: ListDeliverersRequest): Promise<DelivererListResponse> {
    const { data } = await httpClient.get<Deliverer[]>(`/checkout/${params.checkoutId}/deliverer`);
    return data as DelivererListResponse;
}
