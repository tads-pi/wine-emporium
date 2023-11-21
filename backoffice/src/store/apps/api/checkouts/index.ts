import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit"
import * as checkoutService from "../../../../services/checkouts"

interface ConfigurationState {
    response: {
        data: any,
        status: number,
    },
    loading: boolean,
    fn: string,
}

const initialState: ConfigurationState = {
    response: {
        data: {},
        status: 0
    },
    loading: false,
    fn: ""
}

export const listCheckouts = createAsyncThunk("appReportCheckouts/listCheckouts", checkoutService.listCheckouts)
export const getCheckoutById = createAsyncThunk("appReportCheckouts/getCheckoutById", checkoutService.getCheckoutById)
export const updateCheckout = createAsyncThunk("appReportCheckouts/updateCheckout", checkoutService.updateCheckout)
export const appReportCheckoutsSlice = createSlice({
    name: "appReportCheckouts",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addMatcher(isAnyOf(listCheckouts.pending, getCheckoutById.pending, updateCheckout.pending), (state, action) => {
            state.fn = action.type
            state.loading = true
        })
        builder.addMatcher(isAnyOf(listCheckouts.fulfilled, getCheckoutById.fulfilled, updateCheckout.fulfilled), (state, action) => {
            state.fn = action.type
            state.response = action.payload
            state.loading = false
        })
        builder.addMatcher(isAnyOf(listCheckouts.rejected, getCheckoutById.rejected, updateCheckout.rejected), (state, action) => {
            state.fn = action.type
            state.loading = false
        })
    }
})
