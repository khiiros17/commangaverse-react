import { Container } from 'react-bootstrap';

function PagoError() {
    return (
        <Container className="my-5">
            <h1 className="text-warning">Error en el Pago</h1>
            <p>Hubo un problema con tu pago. Por favor, inténtalo de nuevo.</p>
        </Container>
    );
}

export default PagoError;