import { Link } from "react-router-dom";
import useAuthStore from "../../zustand-store/authState";

export function Settings() {
    const { signout } = useAuthStore((store) => {
      return {
        signout: store.signout,
      };
    })
  
    const handleSignout = () => {
      signout()
    }
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', padding: '.5rem' }}>
              <Link to="/perfil/alterar-dados" style={{ textDecoration: 'none' }}>
                  <span style={{ color: 'black' }}>Perfil</span>
              </Link>
              <span style={{ color: 'black' }}>Conta</span>
              <span style={{ color: 'black' }}>Dashboard</span>
              <Link to="/" style={{ textDecoration: 'none' }} onClick={handleSignout} >
                  <span style={{ color: 'black' }}>Sair</span>
              </Link>
            </div>
        </>
    )
}