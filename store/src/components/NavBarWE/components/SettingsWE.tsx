import React from "react";
import { Link } from "react-router-dom";
import useStore from "../../../zustand/store";
import { routes } from "../../../config/routes";

export default function SettingsWE() {
  const { authApi } = useStore()

  function signOut() {
    confirm('Deseja realmente sair?') && authApi.logout()
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', padding: '.5rem' }}>
        <Link to={routes.ACCOUNT_DATA} style={{ textDecoration: 'none' }}>
          <span style={{ color: 'black' }}>Perfil</span>
        </Link>
        <span style={{ color: 'black' }}>Conta</span>
        <span style={{ color: 'black' }}>Dashboard</span>
        <Link to="/" style={{ textDecoration: 'none' }} onClick={signOut} >
          <span style={{ color: 'black' }}>Sair</span>
        </Link>
      </div>
    </>
  )
}