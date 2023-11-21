import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../../../store/apps/api/checkouts";
import { useNavigate } from "react-router-dom";

export default function useListCheckouts() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const selector = useSelector(state => state.appReportCheckouts)

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    function onDoubleClick(checkout) {
        if (!checkout) {
            navigate("/checkouts")
            return
        }

        navigate(`/checkouts/${checkout.id}`)
    }

    useEffect(() => {
        if (selector.response.status < 400 && selector.response.status >= 200) {
            if (selector?.fn?.includes("listCheckouts") || false) {
                setData(selector.response.data)
            }
        }
    }, [selector.response])

    useEffect(() => {
        setLoading(selector.loading)
    }, [selector.loading])

    useEffect(() => {
        dispatch(api.listCheckouts())
    }, [])

    return [
        data,
        loading,
        onDoubleClick,
    ]
}