import { Badge } from 'react-bootstrap';

// ============================================================
//  ESTADO DE UNA ORDEN (átomo): verde si se pagó, rojo si no
// ============================================================
function EstadoOrden({ estado }) {
    return <Badge bg={estado === 'Pagada' ? 'success' : 'danger'}>{estado}</Badge>;
}

export default EstadoOrden;