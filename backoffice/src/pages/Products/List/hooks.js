import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../../../store/apps/api/products";

export default function useListProduct() {
    const dispatch = useDispatch()
    const selector = useSelector(state => state.appReportProducts)

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const [productToUpdate, setProductToUpdate] = useState()
    const [searchText, setSearchText] = useState("")

    function onChangeSearchText(e) {
        setSearchText(e.target.value.toLowerCase())

        if (searchText === "") {
            dispatch(api.getAllProducts())
            return
        }

        dispatch(api.getAllProducts({
            // todo
            // filters: [
            //     `name:${searchText}`,
            // ].join(","),
        }))
    }

    useEffect(() => {
        if (selector.response.status < 400 && selector.response.status >= 200) {
            setData(selector.response.data)
        }
    }, [selector.response])

    useEffect(() => {
        setLoading(selector.loading)
    }, [selector.loading])

    useEffect(() => {
        console.log("fetching data...");
        dispatch(api.getAllProducts())
    }, [])

    return [
        data,
        loading,
        onChangeSearchText,
        productToUpdate,
        setProductToUpdate,
    ]
}