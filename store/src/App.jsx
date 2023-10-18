import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./home"
import { NavBar } from "./components/NavBar"
import { FormCreateUser } from "./components/FormCreateUser"
import { VerMais } from "./components/VerMais"
import { Navigate, Outlet } from "react-router-dom";
import { Nav } from "./components/Nav"
import { PerfilUser } from "./components/PerfilUser"


export function AuthGuard({ isPrivate }) {
    const signedIn = true;

    if (!signedIn && isPrivate) {
        return <Navigate to='/' replace />
    }

    if (signedIn && !isPrivate) {
        // Redicionar para dashboard ('/')
        return <Navigate to='/mercado' replace />
    }

    return (
      <>
        {signedIn && isPrivate ? <Nav /> : null}
        <Outlet />
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
          <Route path="/perfil" element={<PerfilUser />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App