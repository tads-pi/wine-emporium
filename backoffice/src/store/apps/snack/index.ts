import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface ConfigurationState {
    open: boolean,
    message: string,
    type?: "success" | "error" | "info" | "warning"
}

const inititalState: ConfigurationState = {
    open: false,
    message: "",
    type: "success"
}

export const snackSlice = createSlice({
    name: 'snackSlice',
    initialState: inititalState,
    reducers: {
        setSnackMessageSuccess: (state, action) => {            
            state.message = action.payload
            state.open = true
            state.type = "success"
        },
        setSnackMessageError: (state, action) => {
            state.message = action.payload
            state.open = true
            state.type = "error"
        },
        setSnackMessageInfo: (state, action) => {
            state.message = action.payload
            state.open = true
            state.type = "info"
        },
        setSnackMessageWarning: (state, action) => {
            state.message = action.payload
            state.open = true
            state.type = "warning"
        },
        clearSnackMessage: (state) => {
            state.message = ""
            state.open = false
        }
    },
})
