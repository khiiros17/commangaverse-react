import { Container } from 'react-bootstrap';

function NoEncontrada() {
    return (
        <Container className="my-5">
            <h1 className="text-warning">Página no encontrada</h1>
            <p>La página que buscas no existe.</p>
        </Container>
    );
}

export default NoEncontrada;