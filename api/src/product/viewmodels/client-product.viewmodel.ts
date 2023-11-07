import { ProductImageViewmodel } from "../image/viewmodel/product-image.viewmodel";

export class ProductClientViewmodel {
    id: string;
    name: string;
    description: string;
    price: number;
    ratings: number;
    images: ProductImageViewmodel[];
}