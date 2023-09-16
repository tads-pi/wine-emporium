import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./store"

import Login from "./pages/login/Login";
import GerenciarUsuario from "./pages/gerenciar-usuario/gerenciarUsuario";
import UpdateUser from "./pages/User/Update/UpdateUser";
import SaveUser from "./pages/User/Save/SaveUser";
import PageNotFound from "./components/web/PageNotFound";
import ListProducts from "./pages/Products/List/ListProducts";
import SaveProduct from "./pages/Products/Save/SaveProduct";
import UpdateProducts from "./pages/Products/Update/UpdateProduct";
import NavBarWE from "./components/navbar/NavBarWE";

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
            <NavBarWE />
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
                    <Route
                        path="/users/update"
                        element={
                            <PrivateRoute>
                                <UpdateUser />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/users/save"
                        element={
                            <PrivateRoute>
                                <SaveUser />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/products"
                        element={
                            <PrivateRoute>
                                <ListProducts />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/products/update"
                        element={
                            <PrivateRoute>
                                <UpdateProducts />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/products/save"
                        element={
                            <PrivateRoute>
                                <SaveProduct />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

