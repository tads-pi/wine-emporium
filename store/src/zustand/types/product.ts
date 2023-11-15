export interface ProductImage {
    id: string;
    url: string;
    marked: boolean;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    ratings: number;
    category: string;
    images: ProductImage[];
}
