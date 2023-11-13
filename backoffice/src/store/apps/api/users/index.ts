import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit"
import * as usersService from "../../../../services/users"
interface ConfigurationState {
    response: {
        data: any,
        status: number,
    },
    loading: boolean,
    fn: string
}

const initialState: ConfigurationState = {
    response: {
        data: {},
        status: 0
    },
    loading: false,
    fn: ""
}

export const fetchBackofficeUsers = createAsyncThunk('appReportBackofficeUsers/fetchBackofficeUsers', usersService.getAllUsers)
export const toggleUserActive = createAsyncThunk('appReportBackofficeUsers/toggleUserActive', usersService.toggleUserActive)
export const getUserById = createAsyncThunk("appReportBackofficeUsers/getUserById", usersService.getUserById)
export const saveNewUser = createAsyncThunk("appReportBackofficeUsers/saveNewUser", usersService.saveNewUser)
export const updateUser = createAsyncThunk("appReportBackofficeUsers/updateUser", usersService.updateUser)
export const appReportBackofficeUsersSlice = createSlice({
    name: "appReportBackofficeUsers",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addMatcher(isAnyOf(fetchBackofficeUsers.pending, getUserById.pending, saveNewUser.pending, updateUser.pending, toggleUserActive.pending), (state, action) => {
            state.fn = action.type
            state.loading = true
        })
        builder.addMatcher(isAnyOf(fetchBackofficeUsers.fulfilled, getUserById.fulfilled, saveNewUser.fulfilled, updateUser.fulfilled, toggleUserActive.fulfilled), (state, action) => {
            state.fn = action.type
            state.response = action.payload
            state.loading = false
        })
        builder.addMatcher(isAnyOf(fetchBackofficeUsers.rejected, getUserById.rejected, saveNewUser.rejected, updateUser.rejected, toggleUserActive.rejected), (state, action) => {
            state.fn = action.type
            state.loading = false
        })
    }
})