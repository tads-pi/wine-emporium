import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./store"

import Login from "./pages/login/Login";
import GerenciarUsuario from "./pages/gerenciar-usuario/gerenciarUsuario";
import PageNotFound from "./components/web/PageNotFound";

export default function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<PageNotFound />} />
                    <Route
                        path="/login"
                        element={<Login />}
                    />
                    <Route
                        path="/users"
                        element={<GerenciarUsuario />}
                    />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

