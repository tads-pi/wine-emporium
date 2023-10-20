import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from "./home"
import { NavBar } from "./components/NavBar"
import { FormCreateUser } from "./components/FormCreateUser"
import { VerMais } from "./components/VerMais"
import { Navigate, Outlet } from "react-router-dom";
import { Nav } from "./components/Nav"
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import PerfilUser from "./components/PerfilUser"
import { FormUserLogged } from "./components/FormUserLogged"
import useAuthStore from "../src/zustand-store/authState";
import { localStorageKeys } from "./config/localStorageKeys"
import { FormUserAddress } from "./components/FormUserAddress"


export function AuthGuard({ isPrivate }) {
  const { signedIn } = useAuthStore((store) => {
    return {
      signedIn: store.signedIn,
    };
  })
  const storedAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN)


    if (!storedAccessToken && isPrivate) {
        return <Navigate to='/' replace />
    }

    if (storedAccessToken && !isPrivate) {
        // Redicionar para dashboard ('/')
        return <Navigate to='/mercado' replace />
    }

    return (
      <>
        {storedAccessToken && isPrivate ? <Nav /> : null}
        <Outlet />
      </>
    )
}

function EditPerfil() {
  return (
    <>
    <div style={{ display: 'flex', gap: '20px' }}>
      <PerfilUser />
      <Outlet />
    </div>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<AuthGuard isPrivate={false} />}>
          <Route path="/" element={<Home />} />
          <Route path="/criar-cadastro" element={<FormCreateUser />} />
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route path="/mercado" element={<NavBar />} />
          <Route path="/mercado/:id" element={<VerMais />} />
          <Route element={<EditPerfil />}>
            <Route path="/perfil/alterar-dados" element={<FormUserLogged />} />
            <Route path="/perfil/endereco-de-entrega" element={<FormUserAddress />} />
          </Route>
        </Route>


      </Routes>
    </BrowserRouter>
  )
}

export default App