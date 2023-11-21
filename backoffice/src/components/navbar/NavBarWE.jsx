import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function NavBarWE() {
    return (
        <Navbar>
            <Nav>
                <NavDropdown title="Usuários" id="users-nav-dropdown">
                    <NavDropdown.Item href="/users">Ver todos</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/users/save">Criar novo</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Produtos" id="products-nav-dropdown">
                    <NavDropdown.Item href="/products">Ver todos</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/products/save">Criar novo</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Pedidos" id="checkouts-nav-dropdown">
                    <NavDropdown.Item href="/checkouts">Ver todos</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/">Sair</Nav.Link>
            </Nav>
        </Navbar>
    )
}