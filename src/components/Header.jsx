import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

function Header({ cantidadCarrito, usuario, onLogout }) {
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="border-bottom border-warning">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img src="/img/logo.png" alt="Logo de ComMangaVerse" height="40" className="me-2" />
                    ComMangaVerse
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="menu-principal" />

                <Navbar.Collapse id="menu-principal">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
                        <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
                        <Nav.Link as={NavLink} to="/categorias">Categorías</Nav.Link>
                        <Nav.Link as={NavLink} to="/ofertas">Ofertas</Nav.Link>
                        <Nav.Link as={NavLink} to="/nosotros">Nosotros</Nav.Link>
                        <Nav.Link as={NavLink} to="/blogs">Blogs</Nav.Link>
                        <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
                    </Nav>

                    <Nav className="align-items-lg-center">
                        {/* Si hay sesión, saluda; si no, muestra Iniciar sesión y Registrarse */}
                        {usuario ? (
                            <>
                                {/* ⬅️ NUEVO: el enlace al panel solo lo ve el Administrador */}
                                {usuario.tipo === 'Administrador' && (
                                    <Nav.Link as={NavLink} to="/admin" className="text-warning">⚙️ Panel admin</Nav.Link>
                                )}
                                <Navbar.Text className="me-2">Hola, {usuario.nombre}</Navbar.Text>
                                <Nav.Link as="button" className="btn btn-link" onClick={onLogout}>
                                    Cerrar sesión
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={NavLink} to="/login">Iniciar sesión</Nav.Link>
                                <Nav.Link as={NavLink} to="/registro">Registrarse</Nav.Link>
                            </>
                        )}

                        <Nav.Link as={NavLink} to="/carrito">
                            🛒 Carrito <Badge bg="warning" text="dark">{cantidadCarrito}</Badge>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;