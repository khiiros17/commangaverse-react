import { useState } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { obtenerOrdenes } from '../../data/ordenesService';
import EstadoOrden from '../../components/EstadoOrden';
import { formatearPrecio } from '../../utils/formato';
import { formatearFecha } from '../../utils/fechas';

function AdminOrdenes() {
    // ===== ESTADO: filtro por estado ("" = todas) =====
    const [filtro, setFiltro] = useState('');

    // Las más nuevas primero: se copia la lista y se invierte
    const ordenes = [...obtenerOrdenes()].reverse();
    const lista = filtro === '' ? ordenes : ordenes.filter(o => o.estado === filtro);

    return (
        <>
            <h1 className="text-warning h2 mb-3">Órdenes de compra</h1>

            <Form.Group className="mb-3 filtro-admin" controlId="filtro-estado">
                <Form.Label>Filtrar por estado</Form.Label>
                <Form.Select value={filtro} onChange={evento => setFiltro(evento.target.value)}>
                    <option value="">Todas</option>
                    <option value="Pagada">Pagadas</option>
                    <option value="Rechazada">Rechazadas</option>
                </Form.Select>
            </Form.Group>

            {lista.length === 0 ? (
                <p className="text-secondary">No hay órdenes para mostrar.</p>
            ) : (
                <Table variant="dark" responsive hover className="align-middle">
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.map(orden => (
                            <tr key={orden.id}>
                                <td>#{orden.id}</td>
                                <td>{formatearFecha(orden.fecha)}</td>
                                <td>{orden.cliente.nombre} {orden.cliente.apellidos}</td>
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

export default AdminOrdenes;