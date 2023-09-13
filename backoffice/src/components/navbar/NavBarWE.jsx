import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function NavBarWE() {
    return (
        <Navbar className="bg-body-tertiary">
            <Nav className="me-auto">
                <Nav.Link href="/users">Usuários</Nav.Link>
                <Nav.Link href="/products">Produtos</Nav.Link>
            </Nav>
        </Navbar>
    )
}