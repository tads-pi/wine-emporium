import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../../../store/apps/api/products";
import { useNavigate } from "react-router-dom";

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
            // stock: productToUpdate?.stock || 0,
        }))

        console.log("imageData: ", imageData);

        imageData &&
            imageData.map(({ data_url }) => {
                dispatch(api.uploadProductImage({
                    productID: productToUpdate?.id || 0,
                    base64Image: data_url,
                }))
            })

    }

    function setImageData(e) {
        setImage([...imageData, e[0]])
    }

    useEffect(() => {
        setData(selector.response.data)
        if (selector.response.status < 400 && selector.response.status >= 200) {
            if (selector.fn.includes("updateProduct")) {
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
    ]
}