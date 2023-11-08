import { httpClient } from "../httpClient";

export interface ListDeliverersRequest {
    checkoutId: string
}

export interface GetDelivererResponse extends Array<DelivererOption> {
    0: DelivererOption;
    1: DelivererOption;
    2: DelivererOption;
}

export interface DelivererOption {
    id: string;
    name: string;
    fare: number;
}

export async function getDelivererOptions(params: ListDeliverersRequest): Promise<GetDelivererResponse> {
    const { data } = await httpClient.get<DelivererOption[]>(`/checkout/${params.checkoutId}/deliverer`);
    return data as GetDelivererResponse;
}
