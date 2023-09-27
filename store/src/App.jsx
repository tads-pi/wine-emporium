import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./home"
import { NavBar } from "./components/NavBar"
import { FormCreateUser } from "./components/FormCreateUser"
import { VerMais } from "./components/verMais"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mercado" element={<NavBar />} />
        <Route path="/mercado/:id" element={<VerMais/>}/>
        <Route path="/criar-cadastro" element={<FormCreateUser />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
