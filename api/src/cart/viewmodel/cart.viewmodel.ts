import { ProductClientViewmodel } from "src/product/viewmodels/client-product.viewmodel";

export class CartViewmodelProduct extends ProductClientViewmodel {
    amount: number
}

export class CartViewmodel {
    id: string
    products: CartViewmodelProduct[]
}