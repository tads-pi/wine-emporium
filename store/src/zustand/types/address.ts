export interface Address {
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
    type: string;
}

export interface NewAddress {
    country: string;
    state: string;
    city: string;
    neighborhood: string;
    complement: string;
    street: string;
    number: string;
    zip: string;
    type: string;
}