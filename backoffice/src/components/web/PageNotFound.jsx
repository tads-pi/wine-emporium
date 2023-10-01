export default function PageNotFound() {
    return (
        <div className="fitScreen flex-row">
            <aside className="sidebar flex-col center p-5">
                <div className="login-main-text start">
                    <h1 className="display-4">🍷 Wine Emporium</h1>
                    <h2 className="display-5 opacity-50">Backoffice Login Page</h2>
                </div>
            </aside>
            <aside className="main flex-col center p-5">
                <div className="col-md-6 col-sm-12">
                    <div className="login-form">
                        <h1 className="display-4">Página não encontrada</h1>
                        <p className="pt-5">A página que você está tentando acessar não existe.</p>
                    </div>
                </div>
            </aside>
        </div>
    )
}