import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Precio from './Precio';                                   // ⬅️ NUEVO

function TarjetaProducto({ producto, onAgregar }) {
    return (
        <Card bg="dark" text="white" className="h-100 tarjeta-producto">
            <Link to={`/producto/${producto.id}`}>
                <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} />
            </Link>

            <Card.Body className="d-flex flex-column">
                <Badge bg="secondary" className="align-self-start mb-2">
                    {producto.categoria}
                </Badge>

                <Card.Title>
                    <Link to={`/producto/${producto.id}`} className="text-white text-decoration-none">
                        {producto.nombre}
                    </Link>
                </Card.Title>

                {/* ⬅️ CAMBIO: ahora usa el componente Precio (muestra ofertas) */}
                <Precio producto={producto} />

                <Button
                    variant="warning"
                    className="mt-auto"
                    onClick={() => onAgregar(producto.id)}
                >
                    Añadir al carrito
                </Button>
            </Card.Body>
        </Card>
    );
}

export default TarjetaProducto;