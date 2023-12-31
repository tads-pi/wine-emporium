export interface Deliverer {
    id: string;
    name: string;
    fare: number;
}

export interface DelivererListResponse extends Array<Deliverer> {
    0: Deliverer;
    1: Deliverer;
    2: Deliverer;
}
