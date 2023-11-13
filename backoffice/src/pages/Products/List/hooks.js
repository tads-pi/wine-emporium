import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../../../store/apps/api/products";
import { useNavigate } from "react-router-dom";
import { snackSlice } from "../../../store/apps/snack";

export default function useListProduct() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const selector = useSelector(state => state.appReportProducts)

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const [searchText, setSearchText] = useState("")
    const [searchTextField, setSearchTextField] = useState("name")

    // pagination feature
    const [totalItems, setTotalItems] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)

    function onChangePage(page) {
        console.log(`changing page to: ${JSON.stringify(page)}`);

        setCurrentPage(page)
        dispatch(api.getAllProducts({
            page: Number(page + 1),
            limit: 10, // TODO
        }))
    }

    function onChangeSearchText(text) {
        console.log(`searching: '${searchText}' in '${searchTextField}' field`);

        setSearchText(text.toLowerCase())
        if (searchText === "") {
            dispatch(api.getAllProducts())
            return
        }

        dispatch(api.getAllProducts({
            filters: [
                `name:${searchText}`,
            ],
        }))
    }

    function onChangeSearchTextField(field) {
        setSearchTextField(field)
    }

    function onToggleActive(productId) {
        dispatch(api.toggleProductActive({ productId }))
    }

    useEffect(() => {
        if (selector.response.status < 400 && selector.response.status >= 200) {
            if (selector?.fn?.includes("getAllProducts") || false) {
                setData(selector.response.data)
            }
            if (selector?.fn?.includes("getTotalProducts") || false) {
                setTotalItems(Math.ceil(selector?.response?.data || 0))
            }
            if (selector?.fn?.includes("toggleProductActive") || false) {
                // todo fix: snack always not always open due to same message body
                dispatch(snackSlice.actions.setSnackMessageSuccess(selector.response?.data?.message))
                dispatch(api.getAllProducts())
            }
        }
    }, [selector.response])

    useEffect(() => {
        setLoading(selector.loading)
    }, [selector.loading])

    useEffect(() => {
        console.log("fetching data...");
        dispatch(api.getAllProducts())
        dispatch(api.getTotalProducts())
    }, [])

    return [
        data,
        loading,
        onChangeSearchText,
        searchTextField,
        onChangeSearchTextField,
        onToggleActive,
        totalItems,
        currentPage,
        onChangePage,
    ]
}