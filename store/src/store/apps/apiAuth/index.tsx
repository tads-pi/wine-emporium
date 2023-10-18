import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IUserLoginProps } from "../interface"
import { httpClient } from "../../../services/httpClient"

interface ConfigurationState {
    data: [],
    loading: boolean
}

const inititalState: ConfigurationState = {
    data: [],
    loading: false
}

export const fetchAuthentication = createAsyncThunk('appReportLogin/fetchAuthentication', async (user: IUserLoginProps) => {
    try {
        const response = await httpClient.post('login', user)

        return response.data
    } catch (error) {
        return error
    }
})

export const appReportLoginSlice = createSlice({
    name: 'appReportLogin',
    initialState: inititalState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAuthentication.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchAuthentication.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
        })
        builder.addCase(fetchAuthentication.rejected, (state, action) => {
            state.loading = false
        })
    }
})