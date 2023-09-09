import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import GerenciarUsuario from "./pages/gerenciar-usuario/gerenciarUsuario";
// import Users from "./pages/users/Users";

export default function App() {
    return (
        <Routes>
            <Route
                path="/login"
                element={<Login />}
            />
            <Route
                path="/users"
                element={<GerenciarUsuario />}
            />
        </Routes>
    )
}

