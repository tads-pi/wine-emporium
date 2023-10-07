import api from "..";

export type IGetAllProductsFilters = {
    page?: number,
    limit?: number,
}

export type IUpdateProduct = {
    id: string,
    ratings: number,
    name: string,
    description: string,
    price: number,
    stock: number,
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
    stock: number,
}

export type IToggleProductActive = {
    productID: string,
    active: boolean
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
        const response = await api.post("/product", product)
        return response
    } catch (error: any) {
        console.log("error at saveNewProduct: ", error);
        return error?.response ?? {}
    }
}

export async function getTotalProducts() {
    try {
        const response = await api.get("/product/total")
        return response
    } catch (error: any) {
        console.log("error at getTotalProducts: ", error);
        return error?.response ?? {}
    }
}

export async function getAllProducts(filters: IGetAllProductsFilters) {
    try {
        const response = await api.get("/product", {
            params: {
                page: filters?.page || 1,
                limit: filters?.limit || 10,
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
        const response = await api.get(`/product/${productID}`)
        return response
    } catch (error: any) {
        console.log("error at getProductById: ", error);
        return error?.response ?? {}
    }
}

export async function updateProduct(payload: IUpdateProduct) {
    try {
        const newProduct = {
            ratings: payload.ratings,
            name: payload.name,
            description: payload.description,
            price: payload.price,
            stock: payload.stock
        }
        const response = await api.put(`/product/${payload.id}`, { ...newProduct })
        return response
    } catch (error: any) {
        console.log("error at updateProduct: ", error);
        return error?.response ?? {}
    }
}

export async function toggleProductActive(payload: IToggleProductActive) {
    try {
        const response = await api.post(`/product/${payload.productID}/toggle-active`, {
            active: payload.active
        })
        return response
    } catch (error: any) {
        console.log("error at deactivateProduct: ", error);
        return error?.response ?? {}
    }
}

export async function deleteProduct(productID: string) {
    try {
        const response = await api.delete(`/product/${productID}`)
        return response
    } catch (error: any) {
        console.log("error at deleteProduct: ", error);
        return error?.response ?? {}
    }
}

export async function uploadProductImage(payload: IUploadProductImage) {
    try {
        const response = await api.post(`/product/${payload.productID}/upload`, {
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
        const response = await api.delete(`/product/${payload.productID}/delete-image`, {
            data: {
                image_id: payload.imageID
            }
        })
        return response
    } catch (error: any) {
        console.log("error at deleteProductImage: ", error);
        return error?.response ?? {}
    }
}

export async function markProductImage(payload: IMarkProductImage) {
    try {
        const response = await api.put(`/product/${payload.productID}/mark-image`,
            {
                image_id: payload.imageID
            }
        )
        return response
    } catch (error: any) {
        console.log("error at markProductImage: ", error);
        return error?.response ?? {}
    }
}