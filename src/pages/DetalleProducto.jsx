import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Badge, Button, Alert, Breadcrumb } from 'react-bootstrap';
import { formatearPrecio } from '../utils/formato';

function DetalleProducto({ productos, onAgregar }) {
    // Lee el ":id" de la dirección (/producto/3 → id = "3")
    const { id } = useParams();

    // Busca el producto. Number() porque lo que viene de la URL es texto
    const producto = productos.find(p => p.id === Number(id));

    // Si no existe, muestra un mensaje
    if (!producto) {
        return (
            <Container className="my-5">
                <Alert variant="danger">El producto que buscas no existe.</Alert>
                <Link to="/productos">← Volver a productos</Link>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            {/* Ruta: Inicio > Productos > Nombre */}
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Inicio</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/productos' }}>Productos</Breadcrumb.Item>
                <Breadcrumb.Item active>{producto.nombre}</Breadcrumb.Item>
            </Breadcrumb>

            <Row className="g-5">
                <Col md={5}>
                    <img src={producto.imagen} alt={producto.nombre} className="img-fluid rounded detalle-imagen" />
                </Col>

                <Col md={7}>
                    <Badge bg="secondary" className="mb-2">{producto.categoria}</Badge>
                    <h2>{producto.nombre}</h2>
                    <p className="text-secondary">Código: {producto.codigo}</p>
                    <p className="precio fs-3">{formatearPrecio(producto.precio)}</p>
                    <p>{producto.descripcion}</p>
                    <p className="text-secondary">Stock disponible: {producto.stock} unidades</p>

                    <Button variant="warning" size="lg" onClick={() => onAgregar(producto.id)}>
                        Añadir al carrito
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default DetalleProducto;