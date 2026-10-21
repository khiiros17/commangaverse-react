import { Container, Row, Col, Nav } from 'react-bootstrap';
import { NavLink, Outlet, Link } from 'react-router-dom';


function LayoutAdmin() {
    return (
        <Container fluid className="py-4">
            <Row className="g-4">

                <Col md={3} lg={2} as="aside" className="menu-admin">
                    <h2 className="h5 text-warning mb-3">Panel admin</h2>
                    <Nav className="flex-column">
                        <Nav.Link as={NavLink} to="/admin" end>📊 Dashboard</Nav.Link>
                        <Nav.Link as={NavLink} to="/admin/productos">📦 Productos</Nav.Link>

                        <Nav.Link as={NavLink} to="/admin/ordenes">🧾 Órdenes</Nav.Link>
                        <Nav.Link as={NavLink} to="/admin/usuarios">👥 Usuarios</Nav.Link>
                        <Nav.Link as={NavLink} to="/admin/reportes">📈 Reportes</Nav.Link>
                        <Nav.Link as={NavLink} to="/admin/perfil">🙂 Mi perfil</Nav.Link>
                    </Nav>
                    <hr />
                    <Link to="/" className="small">← Volver a la tienda</Link>
                </Col>


                <Col md={9} lg={10}>
                    <Outlet />
                </Col>
            </Row>
        </Container>
    );
}

export default LayoutAdmin;