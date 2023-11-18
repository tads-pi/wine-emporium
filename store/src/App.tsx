import React from "react"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { FormCreateUser } from "./components/FormCreateUser"
import { Navigate, Outlet } from "react-router-dom";
import { routes } from "./config/routes"
import useStore from "./zustand/store"
import StoreWE from "./pages/store/storeWE"
import StoreProductWE from "./pages/storeProduct/storeProductWE";
import LoginWE from "./pages/login/LoginWE";
import Checkout from "./pages/checkout/checkout";
import ProfileWEAddress from "./pages/profile/components/Address";
import ProfileWEUserData from "./pages/profile/components/UserData";
import ProfileWECreditCard from "./pages/profile/components/CreditCard";
import ProfileWECheckout from "./pages/profile/components/Checkout";
import ProfileWEBanner from "./pages/profile/components/Banner";
import ProfileWEAddressAddNewAddress from "./pages/profile/components/AddNewAddress";
import ProfileWECreditCardAddNewCard from "./pages/profile/components/AddNewCreditCard";

export function AuthGuard() {
  const { authApi } = useStore()

  if (!authApi.isLoggedIn) {
    return <Navigate to='/' replace />
  }

  return <Outlet />
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

        <Route element={<ProfileWEBanner />}>
          <Route path={routes.ACCOUNT_DATA} element={<ProfileWEUserData />} />
          <Route path={routes.ACCOUNT_ADDRESS} element={<ProfileWEAddress />} />
          <Route path={routes.ACCOUNT_ADDRESS_NEW_ADDRESS} element={<ProfileWEAddressAddNewAddress />} />
          <Route path={routes.ACCOUNT_CREDIT_CARD} element={<ProfileWECreditCard />} />
          <Route path={routes.ACCOUNT_CREDIT_CARD_NEW_CARD} element={<ProfileWECreditCardAddNewCard />} />
          <Route path={routes.ACCOUNT_CHECKOUTS} element={<ProfileWECheckout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App