import { Badge } from 'react-bootstrap';

// estado de una orden.
function EstadoOrden({ estado }) {
    return <Badge bg={estado === 'Pagada' ? 'success' : 'danger'}>{estado}</Badge>;
}

export default EstadoOrden;