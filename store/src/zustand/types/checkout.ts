import { Address, Cart, CreditCard, Deliverer } from ".";

export interface Checkout {
    id: string;
    sequentialId: number;
    status: string;
    cart: Cart;
    deliverer: Deliverer;
    address: Address;
    payment: Payment
    price: number;
    payedAt: string | null;
}

export interface Payment {
    bankSlip: boolean;
    creditCard: CreditCard | null;
    installments: number;
    installmentsValue: number;
    dueDate: number;
    status: string;
}