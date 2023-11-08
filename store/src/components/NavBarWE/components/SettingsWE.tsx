import React from "react";
import { Link } from "react-router-dom";
import useStore from "../../../zustand/store";

export default function SettingsWE() {
  const { signOut } = useStore()

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', padding: '.5rem' }}>
        <Link to="/perfil/alterar-dados" style={{ textDecoration: 'none' }}>
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