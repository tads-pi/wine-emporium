import useLogin from "./hooks"
import "./styles.css"

export default function Login() {
    const {
        loading,
        formData,
        onFormUpdate,
        onSubmit,
    } = useLogin()

    return (
        <div className="fitScreen flex-row">
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

                                    onChange={(e) => onFormUpdate("email", e.target.value)}
                                />
                                <label>Senha</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="senha"
                                    min={3}
                                    max={255}
                                    required

                                    onChange={(e) => onFormUpdate("password", e.target.value)}
                                />
                            </div>
                            <div className="pt-4">
                                <button
                                    className="btn btn-primary mx-2"
                                    disabled={loading}
                                >
                                    {loading ? "Carregando..." : "Login"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </aside>
        </div>
    )
}