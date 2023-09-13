import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit"
import * as productService from "../../../../services/products"

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

export const getAllProducts = createAsyncThunk("appReportProducts/getAllProducts", productService.getAllProducts)
export const getProductById = createAsyncThunk("appReportProducts/getProductById", productService.getProductById)
export const saveNewProduct = createAsyncThunk("appReportProducts/saveNewProduct", productService.saveNewProduct)
export const updateProduct = createAsyncThunk("appReportProducts/updateProduct", productService.updateProduct)
export const toggleProductActive = createAsyncThunk("appReportProducts/deactivateProduct", productService.toggleProductActive)
export const uploadProductImage = createAsyncThunk("appReportProducts/uploadProductImage", productService.uploadProductImage)
export const deleteProduct = createAsyncThunk("appReportProducts/deleteProduct", productService.deleteProduct)
export const appReportProductsSlice = createSlice({
    name: "appReportProducts",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addMatcher(isAnyOf(getAllProducts.pending, getProductById.pending, saveNewProduct.pending, updateProduct.pending, toggleProductActive.pending, uploadProductImage.pending), (state, action) => {
            state.fn = action.type
            state.loading = true
        })
        builder.addMatcher(isAnyOf(getAllProducts.fulfilled, getProductById.fulfilled, saveNewProduct.fulfilled, updateProduct.fulfilled, toggleProductActive.fulfilled, uploadProductImage.fulfilled), (state, action) => {
            state.fn = action.type
            state.response = action.payload
            state.loading = false
        })
        builder.addMatcher(isAnyOf(getAllProducts.rejected, getProductById.rejected, saveNewProduct.rejected, updateProduct.rejected, toggleProductActive.rejected, uploadProductImage.rejected), (state, action) => {
            state.fn = action.type
            state.loading = false
        })
    }
})
