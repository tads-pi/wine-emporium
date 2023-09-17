import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../../../store/apps/api/products";
import { useNavigate } from "react-router-dom";
import { snackSlice } from "../../../store/apps/snack";

export default function useUpdateProduct({ product }) {
    const dispatch = useDispatch()
    const selector = useSelector(state => state.appReportProducts)

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const [productToUpdate, setProductToUpdate] = useState(product)
    const [imageData, setImage] = useState([])

    const navigate = useNavigate()

    function onSubmit(e) {
        e.preventDefault()

        dispatch(api.updateProduct({
            id: productToUpdate?.id || 0,
            name: productToUpdate?.name || "",
            description: productToUpdate?.description || "",
            price: productToUpdate?.price || 0,
            stock: productToUpdate?.stock || 0,
            active: productToUpdate?.active || false,
        }))

        imageData &&
            imageData.map(({ data_url }) => {
                dispatch(api.uploadProductImage({
                    productID: productToUpdate?.id || 0,
                    base64Image: data_url,
                }))
            })

        dispatch(snackSlice.actions.setSnackMessageInfo("Salvando produto..."))
    }

    function setImageData(e) {
        setImage([...imageData, e[0]])
    }

    function deleteProduct(product) {
        dispatch(snackSlice.actions.setSnackMessageInfo("Deletando produto..."))
        dispatch(api.deleteProduct(product?.id || 0))
    }

    function toggleActive(product) {
        dispatch(api.toggleProductActive(product?.id || 0))
    }

    useEffect(() => {
        setData(selector.response.data)
        console.log("selector: ", selector);
        if (selector.response.status < 400 && selector.response.status >= 200) {
            if (selector.fn.includes("updateProduct")) {
                dispatch(snackSlice.actions.setSnackMessageSuccess("Produto atualizado com sucesso!"))
                navigate("/products")
            }

            if (selector.fn.includes("deleteProduct")) {
                dispatch(snackSlice.actions.setSnackMessageSuccess("Produto deletado com sucesso!"))
                navigate("/products")
            }
        }
    }, [selector.response])

    useEffect(() => {
        setLoading(selector.loading)
    }, [selector.loading])

    return [
        data,
        loading,
        onSubmit,
        setImageData,
        productToUpdate,
        setProductToUpdate,
        deleteProduct,
        toggleActive
    ]
}