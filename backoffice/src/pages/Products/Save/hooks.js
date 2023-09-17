import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../../../store/apps/api/products";
import { useNavigate } from "react-router-dom";
import { snackSlice } from "../../../store/apps/snack";

export default function useSaveProduct() {
    const dispatch = useDispatch()
    const selector = useSelector(state => state.appReportProducts)

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const [productToSave, setProductToSave] = useState({})
    const [imageData, setImage] = useState([])

    const navigate = useNavigate()

    function onSubmit(e) {
        e.preventDefault()

        dispatch(api.saveNewProduct({
            name: productToSave?.name || "",
            description: productToSave?.description || "",
            price: productToSave?.price || 0,
            // stock: productToSave?.stock || 0,
        }))

        dispatch(snackSlice.actions.setSnackMessageInfo("Salvando produto..."))
    }

    function setImageData(e) {
        setImage([...imageData, e[0]])
    }

    useEffect(() => {
        setData(selector.response.data)
        if (selector.response.status < 400 && selector.response.status >= 200) {
            if (selector.fn.includes("saveNewProduct")) {
                imageData &&
                    imageData.map(({ data_url }) => {
                        dispatch(api.uploadProductImage({
                            productID: selector.response?.data?.id || 0,
                            base64Image: data_url,
                        }))
                    })
                console.log("enviando imagens...");
            }

            if (selector.fn.includes("uploadProductImage")) {
                dispatch(snackSlice.actions.setSnackMessageSuccess("Produto salvo com sucesso!"))
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
        productToSave,
        setProductToSave,
    ]
}