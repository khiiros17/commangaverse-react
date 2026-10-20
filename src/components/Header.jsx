import { Navbar, Nav, Container, Badge } from 'react-bootstrap';

function Header({ cantidadCarrito }) {
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="border-bottom border-warning">
            <Container>

                {/* Logo y nombre de la tienda */}
                <Navbar.Brand href="#">
                    <img src="/img/logo.png" alt="Logo de ComMangaVerse" height="40" className="me-2" />
                    ComMangaVerse
                </Navbar.Brand>

                {/* Botón hamburguesa (solo aparece en celular) */}
                <Navbar.Toggle aria-controls="menu-principal" />

                {/* Menú que se esconde en celular */}
                <Navbar.Collapse id="menu-principal">
                    <Nav className="me-auto">
                        <Nav.Link href="#">Inicio</Nav.Link>
                        <Nav.Link href="#">Productos</Nav.Link>
                        <Nav.Link href="#">Categorías</Nav.Link>
                        <Nav.Link href="#">Ofertas</Nav.Link>
                        <Nav.Link href="#">Nosotros</Nav.Link>
                        <Nav.Link href="#">Blogs</Nav.Link>
                        <Nav.Link href="#">Contacto</Nav.Link>
                    </Nav>

                    <Nav>
                        <Nav.Link href="#">Iniciar sesión</Nav.Link>
                        <Nav.Link href="#">Registrarse</Nav.Link>
                        <Nav.Link href="#">
                            Carrito <Badge bg="warning" text="dark">{cantidadCarrito}</Badge>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    );
}

export default Header;