import React from "react"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { FormCreateUser } from "./components/FormCreateUser"
import { Navigate, Outlet } from "react-router-dom";
import { FormUserLogged } from "./components/FormUserLogged"
import { FormUserAddress } from "./components/FormUserAddress"
import { routes } from "./config/routes"
import useStore from "./zustand/store"
import PerfilUser from "./components/PerfilUser"
import StoreWE from "./pages/store/storeWE"
import StoreProductWE from "./pages/storeProduct/storeProductWE";
import LoginWE from "./pages/login/loginWE";

export function AuthGuard() {
  const { isLoggedIn } = useStore()
  if (!isLoggedIn) {
    return <Navigate to='/' replace />
  }

  return <Outlet />
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
        <Route path="/" element={<Navigate to={routes.STORE} />} />

        <Route path={routes.LOGIN} element={<LoginWE />} />
        <Route path={routes.REGISTER} element={<FormCreateUser />} />

        <Route path={routes.STORE} element={<StoreWE />} />
        <Route path={`${routes.STORE}/:id`} element={<StoreProductWE />} />

        <Route element={<EditPerfil />}>
          <Route path="/perfil/alterar-dados" element={<FormUserLogged />} />
          <Route path="/perfil/endereco-de-entrega" element={<FormUserAddress />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App