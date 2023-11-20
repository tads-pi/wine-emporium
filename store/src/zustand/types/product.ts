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

export interface ListProductsParams {
    page?: number,
    limit?: number,
    category?: string,
    name?: string,
    sort?: {
        field: string,
        order: 'asc' | 'desc',
    },
}