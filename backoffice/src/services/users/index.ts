import api from "..";

type IGetUsersFilter = {
    page: number,
    limit: number,
    // todo make filters follow schema: "field:value,field2:value2"
    // filters: string
}

export type IGetAllUsersFilters = {
    page?: number,
    limit?: number,
}

export type IUpdateUser = {
    id: string,
    name: string,
    email: string,
    document: string,
    group: string,
    password: string,
}

export type ISaveNewUser = {
    name: string,
    document: number,
    email: string,
    group: string,
    password: string,
}

export type IToggleUserActive = {
    userId: string
}

export async function getAllUsers(filter?: IGetUsersFilter) {
    try {
        const params = new URLSearchParams()
        params.append(
            'page', filter?.page ? filter?.page.toString() : "1"
        )
        params.append(
            'limit', filter?.limit ? filter?.limit.toString() : "10"
        )
        // TODO
        // if (filter?.filters !== "") {
        //     params.append('filters', filter?.filters)
        // }


        const response = await api.get('/backoffice/user', { params })
        return response
    } catch (error: any) {
        console.log("error at getAllUsers: ", error);
        return error?.response ?? {}
    }
}

export async function saveNewUser(user: ISaveNewUser) {
    try {
        const response = await api.post("/backoffice/user", user)
        return response
    } catch (error: any) {
        console.log("error at saveNewUser: ", error);
        return error?.response ?? {}
    }
}

// TODO in api
// export async function getTotalUsers() {
//     try {
//         const response = await api.get("/user/total")
//         return response
//     } catch (error: any) {
//         console.log("error at getTotalUsers: ", error);
//         return error?.response ?? {}
//     }
// }

export async function getUserById(userID: string | number) {
    try {
        const response = await api.get(`/backoffice/user/${userID}`)
        return response
    } catch (error: any) {
        console.log("error at getUserById: ", error);
        return error?.response ?? {}
    }
}

export async function updateUser(payload: IUpdateUser) {
    try {
        const newUser = {
            name: payload.name,
            email: payload.email,
            document: payload.document,
            group: payload.group,
            password: payload.password,
        }
        const response = await api.put(`/backoffice/user/${payload.id}`, { ...newUser })
        return response
    } catch (error: any) {
        console.log("error at updateUser: ", error);
        return error?.response ?? {}
    }
}

export async function toggleUserActive(payload: IToggleUserActive) {
    try {
        const response = await api.delete(`/backoffice/user/${payload.userId}`)
        return response
    } catch (error: any) {
        console.log("error at toggleUserActive: ", error);
        return error?.response ?? {}
    }
}
