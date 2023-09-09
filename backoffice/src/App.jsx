import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./store"

import Login from "./pages/login/Login";
import GerenciarUsuario from "./pages/gerenciar-usuario/gerenciarUsuario";
import NotFound from "./pages/not-found/NotFound";

export default function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<NotFound />} />
                    <Route
                        path="/login"
                        element={<Login />}
                    />
                    <Route
                        path="/users"
                        element={<GerenciarUsuario />}
                    />

                    {/* //todo remove this and find a better way :) */}
                    <Route path="/" element={
                        <div>
                            <a href="/login">Login</a><br />
                            <a href="/users">Gerenciar Usuários</a>
                        </div>
                    } />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

