import { Navigate, Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./store"

import PageNotFound from "./components/web/PageNotFound";
import ListProducts from "./pages/Products/List/ListProducts";
import SaveProduct from "./pages/Products/Save/SaveProduct";
import UpdateProducts from "./pages/Products/Update/UpdateProduct";
import NavBarWE from "./components/navbar/NavBarWE";
import SnackWE from "./components/snack/SnackWE";
import ListUsers from "./pages/User/List/ListUsers";
import UpdateUser from "./pages/User/Update/UpdateUser";
import SaveUser from "./pages/User/Save/SaveUser";
import Login from "./pages/Login/Page/Login";
import ListCheckouts from "./pages/Checkouts/List/ListCheckouts";
import UpdateProduct from "./pages/Products/Update/UpdateProduct";
import UpdateCheckout from "./pages/Checkouts/Update/UpdateProduct";

// todo enhance this validation and move this component somewhere else
function PrivateRoute({ children }) {
    const token = localStorage.getItem("token")
    if (!token) {
        window.location.href = "/login"
    }

    return (
        <>
            <NavBarWE />
            {children}
        </>
    )
}

export default function App() {
    return (
        <Provider store={store}>
            <SnackWE />
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<PageNotFound />} />
                    <Route
                        path="/login"
                        element={<Navigate to='/' />}
                    />
                    <Route
                        path="/"
                        element={<Login />}
                    />
                    <Route
                        path="/users"
                        element={
                            <PrivateRoute>
                                <ListUsers />
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
                        path="/products/update/:id"
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

                    <Route
                        path="/checkouts"
                        element={
                            <PrivateRoute>
                                <ListCheckouts />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/checkouts/:id"
                        element={
                            <PrivateRoute>
                                <UpdateCheckout />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

