import { Container, Card, Button, Alert } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { obtenerOrdenPorId } from '../data/ordenesService';
import ResumenOrden from '../components/ResumenOrden';

function PagoError() {
    const { id } = useParams();
    const orden = obtenerOrdenPorId(id);

    if (!orden) {
        return (
            <Container className="my-5">
                <Alert variant="danger">No encontramos una orden con ese número.</Alert>
                <Link to="/">← Volver al inicio</Link>
            </Container>
        );
    }

    return (
        <Container className="my-5 contenedor-formulario-ancho">
            <Alert variant="danger">
                <h1 className="h3 mb-1">❌ No se pudo realizar el pago</h1>
                <p className="mb-0">
                    El pago de la orden #{orden.id} fue rechazado. No se hizo ningún cobro y
                    <strong> tu carrito sigue guardado</strong>.
                </p>
            </Alert>

            <Card bg="dark" text="white" className="tarjeta-formulario">
                <Card.Body>
                    <Card.Title className="text-warning">Detalle de la orden #{orden.id}</Card.Title>
                    <ResumenOrden orden={orden} />

                    <div className="d-flex gap-2 flex-wrap">
                        <Button as={Link} to="/checkout" variant="warning">Volver a intentar el pago</Button>
                        <Button as={Link} to="/carrito" variant="outline-light">Ver carrito</Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default PagoError;