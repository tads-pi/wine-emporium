import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../../../store/apps/api/users";
import { useNavigate } from "react-router-dom";
import { snackSlice } from "../../../store/apps/snack";

export default function useSaveUser({ initialFormData = {} }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const selector = useSelector(state => state.appReportBackofficeUsers)

    const [loading, setLoading] = useState(false)
    const [formData, setForm] = useState(initialFormData)

    function onSubmit(action) {
        if (action.preventDefault) action.preventDefault()

        const passwordConfirmationOK = formData?.password === formData?.passwordConfirmation
        if (!passwordConfirmationOK) {
            dispatch(snackSlice.actions.setSnackMessageError("As senhas não conferem!"))
            return
        }

        if (action === "update") {
            dispatch(api.updateUser({
                id: formData?.id || 0,
                name: formData?.name || "",
                document: formData?.document || "",
                email: formData?.email || "",
                group: formData?.group || "",
                password: formData?.password || "",
            }))

            dispatch(snackSlice.actions.setSnackMessageInfo("Salvando usuário..."))
        }

        if (action === "delete") {
            dispatch(api.deleteUser(formData?.id || 0))
            dispatch(snackSlice.actions.setSnackMessageInfo("Deletando usuário..."))
        }

        if (action === "save") {
            dispatch(api.saveNewUser({
                name: formData?.name || "",
                document: formData?.document || "",
                email: formData?.email || "",
                group: formData?.group || "",
                password: formData?.password || "",
            }))

            dispatch(snackSlice.actions.setSnackMessageInfo("Salvando usuário..."))
        }

    }

    function onFormUpdate(field, value) {
        setForm({
            ...formData,
            [field]: value,
        })
    }

    useEffect(() => {
        if (selector.response.status < 400 && selector.response.status >= 200) {
            if (selector.fn.includes("saveNewUser")) {
                dispatch(snackSlice.actions.setSnackMessageSuccess("Usuário salvo com sucesso!"))
                navigate("/users")
                return
            }

            if (selector.fn.includes("updateUser")) {
                dispatch(snackSlice.actions.setSnackMessageSuccess("Usuário atualizado com sucesso!"))
                navigate("/users")
            }

            if (selector.fn.includes("deleteUser")) {
                dispatch(snackSlice.actions.setSnackMessageSuccess("Usuário deletado com sucesso!"))
                navigate("/users")
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

    return [
        formData,
        onFormUpdate,
        loading,
        onSubmit,
    ]
}