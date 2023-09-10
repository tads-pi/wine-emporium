import { api } from "..";

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
            params.append('page', filter.page.toString())
            params.append('limit', filter.limit.toString())
            if (filter.filters !== "") {
                params.append('filters', filter.filters)
            }
        }

        const response = await api.get('/backoffice/user', { params })
        return response
    } catch (error: any) {
        return error?.response ?? {}
    }
}
