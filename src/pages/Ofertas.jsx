import { Container, Alert } from 'react-bootstrap';
import ListaProductos from '../components/ListaProductos';
import { precioFinal } from '../utils/carrito';

function Ofertas({ productos, onAgregar }) {
    // solo los productos cuyo precio final es menor al normal
    const enOferta = productos.filter(p => precioFinal(p) < p.precio);

    return (
        <Container className="my-5">
            <h1 className="text-warning">Ofertas UWU</h1>
            <p className="text-secondary mb-4">Cómics y mangas con precio rebajado por tiempo limitado.</p>

            {enOferta.length === 0 ? (
                <Alert variant="secondary">Por ahora no hay productos en oferta. ¡Vuelve pronto!</Alert>
            ) : (
                <ListaProductos productos={enOferta} onAgregar={onAgregar} />
            )}
        </Container>
    );
}

export default Ofertas;