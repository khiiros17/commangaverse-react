import { Container, Card, Button, Alert } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { obtenerOrdenPorId } from '../data/ordenesService';
import ResumenOrden from '../components/ResumenOrden';

function PagoExitoso() {
    const { id } = useParams();
    const orden = obtenerOrdenPorId(id);

    // Si la orden no existe o no está pagada, no hay boleta que mostrar
    if (!orden || orden.estado !== 'Pagada') {
        return (
            <Container className="my-5">
                <Alert variant="danger">No encontramos una compra pagada con ese número.</Alert>
                <Link to="/">← Volver al inicio</Link>
            </Container>
        );
    }

    const { cliente } = orden;
    const fecha = new Date(orden.fecha).toLocaleString('es-CL');

    return (
        <Container className="my-5 contenedor-formulario-ancho">
            <Alert variant="success">
                <h1 className="h3 mb-1">✅ ¡Compra realizada con éxito!</h1>
                <p className="mb-0">Gracias por tu compra, {cliente.nombre}. Te enviamos el detalle a {cliente.correo}.</p>
            </Alert>

            <Card bg="dark" text="white" className="tarjeta-formulario boleta">
                <Card.Body>
                    <Card.Title className="text-warning">Boleta — Orden #{orden.id}</Card.Title>
                    <p className="text-secondary mb-3">{fecha}</p>

                    <p className="mb-1"><strong>Cliente:</strong> {cliente.nombre} {cliente.apellidos}</p>
                    <p className="mb-1"><strong>Entrega:</strong> {cliente.direccion}, {cliente.comuna}, {cliente.region}</p>
                    {cliente.indicaciones && <p className="mb-1"><strong>Indicaciones:</strong> {cliente.indicaciones}</p>}
                    <p className="mb-3"><strong>Pagado con:</strong> tarjeta terminada en {orden.tarjeta}</p>

                    <ResumenOrden orden={orden} />

                    <div className="d-flex gap-2 flex-wrap no-imprimir">
                        <Button variant="outline-light" onClick={() => window.print()}>Imprimir boleta</Button>
                        <Button as={Link} to="/productos" variant="warning">Seguir comprando</Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default PagoExitoso;