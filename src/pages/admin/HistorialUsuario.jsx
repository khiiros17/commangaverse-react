import { Table, Alert, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { obtenerUsuarioPorRun } from '../../data/usuariosService';
import { obtenerOrdenesDeUsuario } from '../../data/ordenesService';
import EstadoOrden from '../../components/EstadoOrden';
import { formatearPrecio } from '../../utils/formato';
import { formatearFecha } from '../../utils/fechas';

function HistorialUsuario() {
    const { run } = useParams();
    const usuario = obtenerUsuarioPorRun(run);

    if (!usuario) {
        return (
            <>
                <Alert variant="danger">El usuario no existe.</Alert>
                <Link to="/admin/usuarios">← Volver a usuarios</Link>
            </>
        );
    }

    const ordenes = obtenerOrdenesDeUsuario(usuario.correo);
    const totalGastado = ordenes
        .filter(o => o.estado === 'Pagada')
        .reduce((suma, o) => suma + o.total, 0);

    return (
        <>
            <Link to="/admin/usuarios">← Volver a usuarios</Link>

            <h1 className="text-warning h2 mt-3">Historial de {usuario.nombre} {usuario.apellidos}</h1>
            <p className="text-secondary">
                {usuario.correo} · {ordenes.length} orden(es) · Total pagado: <strong>{formatearPrecio(totalGastado)}</strong>
            </p>

            {ordenes.length === 0 ? (
                <Alert variant="secondary">Este usuario todavía no tiene compras.</Alert>
            ) : (
                <Table variant="dark" responsive hover className="align-middle">
                    <thead>
                        <tr><th>N°</th><th>Fecha</th><th>Productos</th><th>Total</th><th>Estado</th><th></th></tr>
                    </thead>
                    <tbody>
                        {ordenes.map(orden => (
                            <tr key={orden.id}>
                                <td>#{orden.id}</td>
                                <td>{formatearFecha(orden.fecha)}</td>
                                <td>{orden.items.map(item => `${item.nombre} × ${item.cantidad}`).join(', ')}</td>
                                <td>{formatearPrecio(orden.total)}</td>
                                <td><EstadoOrden estado={orden.estado} /></td>
                                <td>
                                    <Button as={Link} to={`/admin/ordenes/${orden.id}`} size="sm" variant="outline-warning">
                                        Ver boleta
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
}

export default HistorialUsuario;