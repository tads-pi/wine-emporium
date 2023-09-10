import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./store"

import Login from "./pages/login/Login";
import GerenciarUsuario from "./pages/gerenciar-usuario/gerenciarUsuario";
import PageNotFound from "./components/web/PageNotFound";

// todo enhance this validation and move this component somewhere else
function PrivateRoute({ children }) {
    const token = localStorage.getItem("token")
    if (!token) {
        window.location.href = "/login"
    }

    return children
}

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
                        element={
                            <PrivateRoute>
                                <GerenciarUsuario />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

