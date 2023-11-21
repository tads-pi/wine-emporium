import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { appReportLoginSlice } from './apps/api/auth'
import { appReportBackofficeUsersSlice } from './apps/api/users'
import { appReportProductsSlice } from './apps/api/products'
import { snackSlice } from './apps/snack'
import { appReportCheckoutsSlice } from './apps/api/checkouts'

export const store = configureStore({
    reducer: {
        [appReportLoginSlice.name]: appReportLoginSlice.reducer,
        [appReportProductsSlice.name]: appReportProductsSlice.reducer,
        [appReportBackofficeUsersSlice.name]: appReportBackofficeUsersSlice.reducer,
        [appReportCheckoutsSlice.name]: appReportCheckoutsSlice.reducer,
        [snackSlice.name]: snackSlice.reducer,
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