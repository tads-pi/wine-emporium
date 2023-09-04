import "./login.css"

export default function Login() {
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
                        <form className="">
                            <div className="form-group ">
                                <label>Usuário</label>
                                <input type="text" className="form-control" placeholder="usuario" />
                                <label>Senha</label>
                                <input type="password" className="form-control" placeholder="senha" />
                            </div>
                            <div className="pt-4">
                                <button type="submit" className="btn btn-primary mx-2">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </aside>
        </div>
    )
}