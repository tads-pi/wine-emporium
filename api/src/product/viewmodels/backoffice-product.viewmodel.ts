import { ProductStock } from "@prisma/client";
import { ProductClientViewmodel } from "./client-product.viewmodel";

export class ProductBackofficeViewmodel extends ProductClientViewmodel {
    active: boolean;
    // todo use viewmodel here
    stock: ProductStock[];
}