import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../../../store/apps/api/users";
import { useNavigate } from "react-router-dom";
import { snackSlice } from "../../../store/apps/snack";

export default function useListUser() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const selector = useSelector(state => state.appReportBackofficeUsers)

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const [searchText, setSearchText] = useState("")
    const [searchTextField, setSearchTextField] = useState("")

    // pagination feature
    const [totalItems, setTotalItems] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)

    function onChangePage(page) {
        console.log(`changing page to: ${JSON.stringify(page)}`);

        setCurrentPage(page)
        dispatch(api.fetchBackofficeUsers({
            page: Number(page + 1),
            limit: 10, // TODO
        }))
    }

    function onChangeSearchText(text) {
        console.log(`searching: '${searchText}' in '${searchTextField}' field`);

        setSearchText(text.toLowerCase())
        if (searchText === "") {
            dispatch(api.fetchBackofficeUsers())
            return
        }

        dispatch(api.fetchBackofficeUsers({
            // todo
            // filters: [
            //     `name:${searchText}`,
            // ].join(","),
        }))
    }

    function onChangeSearchTextField(field) {
        setSearchTextField(field)
    }

    function onDoubleClick(user) {
        if (!user) {
            navigate("/users")
            return
        }

        navigate("/users/update", {
            state: {
                user: user
            }
        })
    }

    function onToggleActive(userId, value) {
        // send confirm message
        dispatch(api.toggleUserActive({
            userID: userId,
            active: value,
        }))
    }

    useEffect(() => {
        if (selector.response.status < 400 && selector.response.status >= 200) {
            if (selector?.fn?.includes("fetchBackofficeUsers") || false) {
                setData(selector.response.data)
            }
            if (selector?.fn?.includes("getTotalUsers") || false) {
                setTotalItems(Math.ceil(selector?.response?.data?.total || 0))
            }
            if (selector?.fn?.includes("toggleUserActive") || false) {
                // todo fix: snack always not always open due to same message body
                dispatch(snackSlice.actions.setSnackMessageSuccess(selector.response?.data?.message))
                dispatch(api.fetchBackofficeUsers())
            }
        }
    }, [selector.response])

    useEffect(() => {
        setLoading(selector.loading)
    }, [selector.loading])

    useEffect(() => {
        console.log("fetching data...");
        dispatch(api.fetchBackofficeUsers())
        // TODO
        // dispatch(api.getTotalUsers())
    }, [])

    return [
        data,
        loading,
        onChangeSearchText,
        searchTextField,
        onChangeSearchTextField,
        onDoubleClick,
        onToggleActive,
        totalItems,
        currentPage,
        onChangePage,
    ]
}