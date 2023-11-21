import api from "..";

export async function listCheckouts() {
    try {
        const response = await api.get("/checkout/backoffice")
        return response
    } catch (error: any) {
        console.log("error at listCheckouts: ", error);
        return error?.response ?? {}
    }
}

export async function getCheckoutById(checkoutId: string) {
    try {
        const response = await api.get(`/checkout/backoffice/find/${checkoutId}`)
        return response
    } catch (error: any) {
        console.log("error at getCheckoutById: ", error);
        return error?.response ?? {}
    }
}

interface IUpdateCheckout {
    id: string
    status: string
}

export async function updateCheckout(payload: IUpdateCheckout) {
    try {
        const response = await api.put(`/checkout/backoffice/status`, { id: payload.id, status: payload.status })
        return response
    } catch (error: any) {
        console.log("error at updateCheckout: ", error);
        return error?.response ?? {}
    }
}