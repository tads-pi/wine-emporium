import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../../../store/apps/api/users";
import { useNavigate } from "react-router-dom";

export default function useUpdateUser({ user }) {
    const dispatch = useDispatch()
    const selector = useSelector(state => state.appReportUsers)

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const [userToSave, setUserToUpdate] = useState(user)

    const navigate = useNavigate()

    function onSubmit(e) {
        e.preventDefault()

        dispatch(api.saveNewUser({
            name: userToSave?.name || "",
            document: userToSave?.document || "",
            email: userToSave?.email || 0,
            password: userToSave?.password || 0,
            group: userToSave?.group || 0,
        }))
    }

    function deleteUser(user) {
        dispatch(api.deleteUser(user?.id || 0))
    }

    function toggleActive(user) {
        dispatch(api.toggleUserActive(user?.id || 0))
    }

    useEffect(() => {
        setData(selector.response.data)
        if (selector.response.status < 400 && selector.response.status >= 200) {
            if (selector.fn.includes("updateUser") || selector.fn.includes("deleteUser")) {
                navigate("/users")
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
        userToSave,
        setUserToUpdate,
        deleteUser,
        toggleActive
    ]
}