import { Row, Col } from 'react-bootstrap';
import TarjetaProducto from './TarjetaProducto';

function ListaProductos({ productos, onAgregar }) {
    if (productos.length === 0) {
        return <p className="text-secondary">No hay productos para mostrar.</p>;
    }

    return (
        <Row className="g-4">
            {productos.map(producto => (
                <Col key={producto.id} xs={12} sm={6} md={4} lg={3}>
                    <TarjetaProducto producto={producto} onAgregar={onAgregar} />
                </Col>
            ))}
        </Row>
    );
}

export default ListaProductos;