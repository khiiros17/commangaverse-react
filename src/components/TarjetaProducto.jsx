import { Card, Button, Badge } from 'react-bootstrap';
import { formatearPrecio } from '../utils/formato';

function TarjetaProducto({ producto, onAgregar }) {
    return (
        <Card bg="dark" text="white" className="h-100 tarjeta-producto">
            <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} />

            <Card.Body className="d-flex flex-column">
                <Badge bg="secondary" className="align-self-start mb-2">
                    {producto.categoria}
                </Badge>

                <Card.Title>{producto.nombre}</Card.Title>

                <Card.Text className="precio">
                    {formatearPrecio(producto.precio)}
                </Card.Text>

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