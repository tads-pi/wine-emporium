import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { snackSlice } from "../../../store/apps/snack";
import * as api from "../../../store/apps/api/checkouts";

export default function useUpdateCheckout({ id }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const selector = useSelector(state => state.appReportCheckouts)

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState("")

    useEffect(() => {
        if (selector.response.status < 400 && selector.response.status >= 200) {
            if (selector?.fn?.includes("getCheckoutById") || false) {
                setData(selector.response.data)
                setStatus(selector.response.data.status)
            }
            if (selector?.fn?.includes("updateCheckout") || false) {
                dispatch(snackSlice.actions.setSnackMessageInfo("Pedido Atualizado com sucesso!"))
                goBack()
            }
        }
    }, [selector.response])

    useEffect(() => {
        setLoading(selector.loading)
    }, [selector.loading])

    useEffect(() => {
        if (id) {
            dispatch(api.getCheckoutById(id))
        }
    }, [])

    function goBack() {
        navigate("/checkouts")
    }

    function saveAndGoBack() {
        dispatch(api.updateCheckout({ id, status }))
    }

    return [
        data,
        status,
        setStatus,
        loading,
        goBack,
        saveAndGoBack,
    ]
};
