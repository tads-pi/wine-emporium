import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./styles.css"
import * as api from "../../../store/apps/api/auth"

export default function Login() {
    // TODO refatorar e add um hook
    const dispatch = useDispatch()

    const [loginForm, setLoginForm] = useState({
        username: "",
        password: ""
    })

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(api.fetchAuthentication({
            username: loginForm.username,
            password: loginForm.password
        }))
    }

    const loading = useSelector((state) => state.appReportLogin.loading)
    const response = useSelector((state) => state.appReportLogin.response)

    const [data, setData] = useState()
    const [status, setStatus] = useState()
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        setData(response?.data || {})
        setStatus(response?.status || 0)
    }, [response])

    useEffect(() => {
        if (status === 404 || status === 401) {
            setErrorMessage("Usuário ou senha incorretos.")
        }

        if (status === 200) {
            localStorage.setItem("token", data?.access_token ?? "")
            window.location.href = "/users"
        }

    }, [status, data])

    return (
        <div className="container flex-row">
            <aside className="sidebar flex-col center p-5">
                <div className="login-main-text start">
                    <h1 className="display-4">🍷 Wine Emporium</h1>
                    <h2 className="display-5 opacity-50">Backoffice Login Page</h2>
                    <p className="pt-5">Entre com suas credenciais para acessar o backoffice.</p>
                </div>
            </aside>
            <aside className="main flex-col center p-5">
                <div className="col-md-6 col-sm-12">
                    <div className="login-form">
                        <form
                            onSubmit={onSubmit}
                        >
                            <div className="form-group">
                                <label>e-mail</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="e-mail"
                                    min={3}
                                    max={255}
                                    required

                                    onChange={(e) => {
                                        setLoginForm({
                                            ...loginForm,
                                            username: e.target.value
                                        })
                                    }}
                                />
                                <label>Senha</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="senha"
                                    min={3}
                                    max={255}
                                    required

                                    onChange={(e) => {
                                        setLoginForm({
                                            ...loginForm,
                                            password: e.target.value
                                        })
                                    }}
                                />
                            </div>
                            <div className="pt-4">
                                <button
                                    className="btn btn-primary mx-2"
                                    disabled={loading}
                                >
                                    {loading ? "Carregando..." : "Login"}
                                </button>

                                {/* //TODO use other notification */}
                                <p>{errorMessage}</p>
                            </div>
                        </form>
                    </div>
                </div>
            </aside>
        </div>
    )
}