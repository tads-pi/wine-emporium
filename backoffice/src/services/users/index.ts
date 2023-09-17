import api from "..";

type IGetUsersFilter = {
    page: number,
    limit: number,
    // todo make filters follow schema: "field:value,field2:value2"
    filters: string
}

export async function getAllUsers(filter?: IGetUsersFilter) {
    try {
        const params = new URLSearchParams()
        if (filter) {
            params.append(
                'page', filter.page ? filter.page.toString() : "1"
            )
            params.append(
                'limit', filter.limit ? filter.limit.toString() : "10"
            )
            if (filter.filters !== "") {
                params.append('filters', filter.filters)
            }
        }

        const response = await api.get('/user', { params })
        return response
    } catch (error: any) {
        console.log("error at getAllUsers: ", error);
        return error?.response ?? {}
    }
}
