export interface ProductImage {
    id: string;
    url: string;
    marked: boolean;
}

export interface ProductItem {
    id: string;
    name: string;
    description: string;
    price: number;
    ratings: number;
    images: ProductImage[];
}

export * from './list'
export * from './findById'
export * from './total'