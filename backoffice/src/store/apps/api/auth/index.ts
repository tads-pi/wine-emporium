import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { login } from "../../../../services/auth"

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

export const fetchAuthentication = createAsyncThunk('appReportLogin/fetchAuthentication', login)
export const appReportLoginSlice = createSlice({
    name: 'appReportLogin',
    initialState: inititalState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAuthentication.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchAuthentication.fulfilled, (state, action) => {
            state.response = action.payload
            state.loading = false
        })
        builder.addCase(fetchAuthentication.rejected, (state, action) => {
            state.loading = false
        })
    }
})