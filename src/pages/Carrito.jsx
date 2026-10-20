import { Container, Table, Button, Alert, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatearPrecio } from '../utils/formato';
import { detalleCarrito, calcularTotal, precioFinal } from '../utils/carrito';

function Carrito({ carrito, productos, onCambiarCantidad, onQuitar, onVaciar }) {
    const lineas = detalleCarrito(carrito, productos);
    const total = calcularTotal(carrito, productos);

    // ===== CARRITO VACÍO =====
    if (lineas.length === 0) {
        return (
            <Container className="my-5">
                <h1 className="text-warning mb-4">Carrito de compras</h1>
                <Alert variant="secondary">
                    Tu carrito está vacío. <Link to="/productos">Ver productos</Link>
                </Alert>
            </Container>
        );
    }

    // ===== CARRITO CON PRODUCTOS =====
    return (
        <Container className="my-5">
            <h1 className="text-warning mb-4">Carrito de compras</h1>

            <Row className="g-4">
                {/* Tabla de productos */}
                <Col lg={8}>
                    <Table variant="dark" responsive className="align-middle">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {lineas.map(({ producto, cantidad, subtotal }) => (
                                <tr key={producto.id}>
                                    <td>
                                        <img src={producto.imagen} alt={producto.nombre} className="miniatura me-2" />
                                        {producto.nombre}
                                    </td>
                                    <td>{formatearPrecio(precioFinal(producto))}</td>
                                    <td>
                                        <Button
                                            size="sm"
                                            variant="outline-light"
                                            aria-label={`Restar ${producto.nombre}`}
                                            onClick={() => onCambiarCantidad(producto.id, -1)}
                                        >
                                            −
                                        </Button>
                                        <span className="mx-2">{cantidad}</span>
                                        <Button
                                            size="sm"
                                            variant="outline-light"
                                            aria-label={`Sumar ${producto.nombre}`}
                                            onClick={() => onCambiarCantidad(producto.id, 1)}
                                            disabled={cantidad >= producto.stock}
                                        >
                                            +
                                        </Button>
                                    </td>
                                    <td>{formatearPrecio(subtotal)}</td>
                                    <td>
                                        <Button size="sm" variant="outline-danger" onClick={() => onQuitar(producto.id)}>
                                            Quitar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Button variant="outline-secondary" onClick={onVaciar}>
                        Vaciar carrito
                    </Button>
                </Col>

                {/* Resumen */}
                <Col lg={4}>
                    <Card bg="dark" text="white" className="resumen-carrito">
                        <Card.Body>
                            <Card.Title>Resumen</Card.Title>
                            <p className="d-flex justify-content-between fs-4 mb-3">
                                <span>Total:</span>
                                <strong className="precio" data-testid="total-carrito">{formatearPrecio(total)}</strong>
                            </p>
                            <Button as={Link} to="/checkout" variant="warning" className="w-100">
                                Ir a pagar
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Carrito;