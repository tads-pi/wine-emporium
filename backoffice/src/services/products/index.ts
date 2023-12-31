import api from "..";

export type IGetAllProductsFilters = {
    page?: number,
    limit?: number,
    filters?: [
        {
            key: string,
            value: string,
        }
    ]
}

export type IUpdateProduct = {
    id: string,
    ratings: number,
    name: string,
    description: string,
    price: number,
    category: string,
    stock: {
        id: string,
        total: number,
    },
}

export type IUploadProductImage = {
    productID: string
    base64Image: string
}

export type ISaveNewProduct = {
    ratings: number,
    name: string,
    description: string,
    price: number,
    category: string,
    stock: number,
}

export type IToggleProductActive = {
    productId: string
}

export type IDeleteProductImage = {
    productID: string,
    imageID: string
}

export type IMarkProductImage = {
    productID: string,
    imageID: string
}

export async function saveNewProduct(product: ISaveNewProduct) {
    try {
        const response = await api.post("/product/backoffice", product)
        return response
    } catch (error: any) {
        console.log("error at saveNewProduct: ", error);
        return error?.response ?? {}
    }
}

export async function getTotalProducts() {
    try {
        const response = await api.get("/product/backoffice/total")
        return response
    } catch (error: any) {
        console.log("error at getTotalProducts: ", error);
        return error?.response ?? {}
    }
}

export async function getAllProducts(filters: IGetAllProductsFilters) {
    try {
        const response = await api.get("/product/backoffice", {
            params: {
                page: filters?.page || 1,
                limit: filters?.limit || 10,
                filters: filters?.filters?.join(',') || '',
            }
        })
        return response
    } catch (error: any) {
        console.log("error at getAllProducts: ", error);
        return error?.response ?? {}
    }
}

export async function getProductById(productID: string | number) {
    try {
        const response = await api.get(`/product/backoffice/${productID}`)
        return response
    } catch (error: any) {
        console.log("error at getProductById: ", error);
        return error?.response ?? {}
    }
}

export async function updateProduct(payload: IUpdateProduct) {
    try {
        const response = await api.put(`/product/backoffice/${payload.id}`, payload)

        await api.put(`/product/backoffice/${payload.id}/stock`, {
            stock_id: payload.stock.id,
            total: payload.stock.total,
        })

        return response
    } catch (error: any) {
        console.log("error at updateProduct: ", error);
        return error?.response ?? {}
    }
}

export async function toggleProductActive(payload: IToggleProductActive) {
    try {
        const response = await api.delete(`/product/backoffice/${payload.productId}`)
        return response
    } catch (error: any) {
        console.log("error at deactivateProduct: ", error);
        return error?.response ?? {}
    }
}

export async function uploadProductImage(payload: IUploadProductImage) {
    try {
        const response = await api.post(`/product/${payload.productID}/image`, {
            imageBinary: payload.base64Image
        })
        return response
    } catch (error: any) {
        console.log("error at uploadProductImage: ", error);
        return error?.response ?? {}
    }
}

export async function deleteProductImage(payload: IDeleteProductImage) {
    try {
        const response = await api.delete(`/product/${payload.productID}/image/${payload.imageID}`)
        return response
    } catch (error: any) {
        console.log("error at deleteProductImage: ", error);
        return error?.response ?? {}
    }
}

export async function markProductImage(payload: IMarkProductImage) {
    try {
        const response = await api.post(`/product/${payload.productID}/image/${payload.imageID}/mark`)
        return response
    } catch (error: any) {
        console.log("error at markProductImage: ", error);
        return error?.response ?? {}
    }
}