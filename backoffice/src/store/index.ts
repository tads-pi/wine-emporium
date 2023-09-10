import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { appReportLoginSlice } from './apps/api/auth'
import { appReportBackofficeUsersSlice } from './apps/api/users'

export const store = configureStore({
    reducer: {
        [appReportLoginSlice.name]: appReportLoginSlice.reducer,
        [appReportBackofficeUsersSlice.name]: appReportBackofficeUsersSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
    // .concat(apiAuth.middleware)
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>