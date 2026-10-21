import { Badge } from 'react-bootstrap';
import { formatearPrecio } from '../utils/formato';
import { precioFinal } from '../utils/carrito';

// nmuestra los precio normales y las ofertas
function Precio({ producto, grande = false }) {
    const enOferta = precioFinal(producto) !== producto.precio;
    const tamano = grande ? 'fs-3' : '';

    if (!enOferta) {
        return <p className={`precio ${tamano}`}>{formatearPrecio(producto.precio)}</p>;
    }

    return (
        <p className={`precio ${tamano}`}>
            <Badge bg="danger" className="me-2">Oferta</Badge>
            {formatearPrecio(producto.precioOferta)}{' '}
            <small className="precio-anterior">{formatearPrecio(producto.precio)}</small>
        </p>
    );
}

export default Precio;