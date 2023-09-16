import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllUsers } from "../../../../services/users"

interface ConfigurationState {
    response: {
        data: any,
        status: number,
    },
    loading: boolean
}

const inititalState: ConfigurationState = {
    response: {
        data: {},
        status: 0
    },
    loading: false
}

export const fetchBackofficeUsers = createAsyncThunk('appReportBackofficeUsers/fetchBackofficeUsers', getAllUsers)
export const appReportBackofficeUsersSlice = createSlice({
    name: 'appReportBackofficeUsers',
    initialState: inititalState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchBackofficeUsers.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchBackofficeUsers.fulfilled, (state, action) => {
            state.response = action.payload
            state.loading = false
        })
        builder.addCase(fetchBackofficeUsers.rejected, (state, action) => {
            state.loading = false
        })
    }
})
