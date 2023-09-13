import api from "..";

export type IUpdateProduct = {
    id: string,
    name: string,
    description: string,
    price: number,
    stock: number,
}

export type IUploadProductImage = {
    productID: string
    base64Image: string
}

export async function saveNewProduct() {
    try {
        const response = await api.post("/product")
        return response
    } catch (error: any) {
        console.log("error at saveNewProduct: ", error);
        return error?.response ?? {}
    }
}

export async function getAllProducts() {
    try {
        const response = await api.get("/product")
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

export async function toggleProductActive(productID: string) {
    try {
        const response = await api.delete(`/product/${productID}/toggle-active`)
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
