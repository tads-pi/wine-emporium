import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { snackSlice } from "../../../store/apps/snack"
import * as api from "../../../store/apps/api/auth"

export default function useLogin() {
    const dispatch = useDispatch()
    const selector = useSelector(state => state.appReportLogin)

    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    function onSubmit(e) {
        if (e.preventDefault) e.preventDefault()
        dispatch(api.fetchAuthentication({
            email: formData.email,
            password: formData.password
        }))
    }

    function onFormUpdate(field, value) {
        setFormData({
            ...formData,
            [field]: value,
        })
    }

    useEffect(() => {
        if (selector.response.status < 400 && selector.response.status >= 200) {
            window.location.href = "/users"
            localStorage.setItem("token", selector.response.data.access_token)
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


    return {
        loading,
        formData,
        onFormUpdate,
        onSubmit,
    }
};
