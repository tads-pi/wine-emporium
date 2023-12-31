import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../../../store/apps/api/products";
import { useNavigate, useParams } from "react-router-dom";
import { snackSlice } from "../../../store/apps/snack";

export default function useSaveProduct(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const selector = useSelector(state => state.appReportProducts)

    const [loading, setLoading] = useState(false)
    const [formData, setForm] = useState()
    const [imageData, setImage] = useState([])

    function onSubmit(action) {
        if (action.preventDefault) action.preventDefault()

        if (action === "update") {
            const newProduct = {
                id: formData?.id || 0,
                name: formData?.name || "",
                ratings: formData?.ratings || 0,
                description: formData?.description || "",
                price: Number(formData?.price) || 0,
                category: formData?.category || "",
                stock: {
                    id: formData?.stock[0].id || '',
                    total: Number(formData?.new_stock) || 0,
                }
            }

            dispatch(api.updateProduct(newProduct))

            imageData &&
                imageData.map(({ data_url }) => {
                    dispatch(api.uploadProductImage({
                        productID: formData?.id || 0,
                        base64Image: data_url,
                    }))
                })

            dispatch(snackSlice.actions.setSnackMessageInfo("Salvando produto..."))
        }

        if (action === "delete") {
            dispatch(api.deleteProduct(formData?.id || 0))
            dispatch(snackSlice.actions.setSnackMessageInfo("Deletando produto..."))
        }

        if (action === "save") {
            dispatch(api.saveNewProduct({
                ratings: formData?.ratings || 0,
                name: formData?.name || "",
                description: formData?.description || "",
                category: formData?.category || "",
                price: Number(formData?.price) || 0,
                stock: Number(formData?.stock) || 0,
            }))

            dispatch(snackSlice.actions.setSnackMessageInfo("Salvando produto..."))
        }

    }

    function onFormUpdate(field, value) {
        if (field === "image") {
            setImageData(value)

            setForm({
                ...formData,
                images: value,
            })

            console.log(formData);
            return
        }

        setForm({
            ...formData,
            [field]: value,
        })
    }

    function setImageData(e) {
        setImage([...e])
    }

    function deleteImage(imageID) {
        // delete image from server
        dispatch(api.deleteProductImage({
            productID: formData?.id || 0,
            imageID,
        }))

        dispatch(snackSlice.actions.setSnackMessageInfo("Deletando imagem..."))

        // delete image locally from form
        onFormUpdate("images", formData.images.filter(({ key }) => key !== imageID))
    }

    function markImage(imageID) {
        dispatch(api.markProductImage({
            productID: formData?.id || 0,
            imageID,
        }))

        dispatch(snackSlice.actions.setSnackMessageInfo("Marcando imagem..."))
    }

    useEffect(() => {
        if (selector.response.status < 400 && selector.response.status >= 200) {
            if (selector.fn.includes("saveNewProduct")) {
                if (imageData.length === 0) {
                    dispatch(snackSlice.actions.setSnackMessageSuccess("Produto salvo com sucesso!"))
                    navigate("/products")
                    return
                }

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

            if (selector.fn.includes("updateProduct")) {
                dispatch(snackSlice.actions.setSnackMessageSuccess("Produto atualizado com sucesso!"))
                navigate("/products")
            }

            if (selector.fn.includes("getProductById")) {
                setForm({
                    ...selector.response.data,
                    new_stock: selector.response.data?.stock[0]?.total || 0,
                })
                setLoading(false)
            }

            if (selector.fn.includes("deleteProductImage")) {
                dispatch(snackSlice.actions.setSnackMessageSuccess("Imagem deletada com sucesso!"))
            }

            if (selector.fn.includes("markProductImage")) {
                dispatch(snackSlice.actions.setSnackMessageSuccess("Imagem marcada com sucesso!"))
            }

        }

        if (selector.response.status >= 400 && selector.response.status < 500) {
            dispatch(snackSlice.actions.setSnackMessageError(selector.response.data.message))
        }

        if (selector.response.status >= 500) {
            dispatch(snackSlice.actions.setSnackMessageError("Erro do servidor, tente novamente mais tarde"))
        }

    }, [selector.response])

    useEffect(() => {
        setLoading(selector.loading)
    }, [selector.loading])

    useEffect(() => {
        if (props?.productID) {
            dispatch(api.getProductById(props?.productID))
            setLoading(true)
        }
    }, [])

    return [
        formData,
        onFormUpdate,
        loading,
        onSubmit,
        deleteImage,
        markImage,
    ]
}