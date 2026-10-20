import { Table } from 'react-bootstrap';
import { formatearPrecio } from '../utils/formato';

// ============================================================
//  RESUMEN DE ORDEN (organismo): tabla con los productos
//  comprados y el total. Se usa en Pago exitoso y Pago con error.
// ============================================================
function ResumenOrden({ orden }) {
    return (
        <Table variant="dark" responsive className="align-middle">
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                {orden.items.map(item => (
                    <tr key={item.id}>
                        <td>{item.nombre}</td>
                        <td>{formatearPrecio(item.precio)}</td>
                        <td>{item.cantidad}</td>
                        <td>{formatearPrecio(item.subtotal)}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <th colSpan={3}>Total</th>
                    <th className="precio" data-testid="total-orden">{formatearPrecio(orden.total)}</th>
                </tr>
            </tfoot>
        </Table>
    );
}

export default ResumenOrden;