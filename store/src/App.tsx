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
import LoginWE from "./pages/login/LoginWE";
import { Checkout } from "./pages/checkout/checkout";

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

        <Route path={routes.CHECKOUT} element={<Checkout />} />
        <Route element={<EditPerfil />}>
          <Route path={routes.ACCOUNT_DATA} element={<FormUserLogged />} />
          <Route path={routes.ACCOUNT_ADDRESS} element={<FormUserAddress />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App