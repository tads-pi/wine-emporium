import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBackofficeUsers } from "../../../store/apps/api/users";
import { useNavigate } from "react-router-dom";

export default function useGerenciarUsuario() {
    const dispatch = useDispatch()
    const selector = useSelector(state => state.appReportBackofficeUsers)

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const [userToUpdate, setUserToUpdate] = useState()
    const [searchText, setSearchText] = useState("")

    const navigate = useNavigate()

    function onChangeSearchText(e) {
        setSearchText(e.target.value.toLowerCase())

        if (searchText === "") {
            dispatch(fetchBackofficeUsers())
            return
        }

        dispatch(fetchBackofficeUsers({
            // para mais informações consultar rota de documentação!!
            filters: [
                `name:${searchText}`,
            ].join(","),
        }))
    }

    useEffect(() => {
        if (selector.response.status < 400 && selector.response.status >= 200) {
            setUsers(selector.response.data)
        }
    }, [selector.response])

    useEffect(() => {
        setLoading(selector.loading)
    }, [selector.loading])

    useEffect(() => {
        console.log("fetching users...");
        dispatch(fetchBackofficeUsers())
    }, [])

    function updateUser() {
        setUserToUpdate(userToUpdate)
        navigate("/products/update", {
            state: {
                user: userToUpdate
            }
        })
    }

    return [
        users,
        loading,
        onChangeSearchText,
        userToUpdate,
        setUserToUpdate,
        updateUser
    ]
}