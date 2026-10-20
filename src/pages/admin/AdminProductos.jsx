import { useState } from 'react';
import { Table, Button, Badge, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatearPrecio } from '../../utils/formato';
import { esCritico } from '../../utils/validacionesProducto';

function AdminProductos({ productos, onEliminar }) {
    // ===== ESTADO: ¿mostrar solo los críticos? =====
    const [soloCriticos, setSoloCriticos] = useState(false);

    const lista = soloCriticos ? productos.filter(esCritico) : productos;

    function confirmarEliminar(producto) {
        // window.confirm muestra una ventana con "Aceptar" y "Cancelar"
        if (window.confirm(`¿Seguro que quieres eliminar "${producto.nombre}"?`)) {
            onEliminar(producto.id);
        }
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                <h1 className="text-warning h2 mb-0">Productos</h1>
                <Button as={Link} to="/admin/productos/nuevo" variant="warning">+ Nuevo producto</Button>
            </div>

            <Form.Check
                type="switch"
                id="solo-criticos"
                label="Mostrar solo productos con stock crítico"
                checked={soloCriticos}
                onChange={evento => setSoloCriticos(evento.target.checked)}
                className="mb-3"
            />

            {lista.length === 0 ? (
                <p className="text-secondary">No hay productos para mostrar.</p>
            ) : (
                <Table variant="dark" responsive hover className="align-middle">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.map(producto => (
                            <tr key={producto.id}>
                                <td>{producto.codigo}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.categoria}</td>
                                <td>
                                    {formatearPrecio(producto.precio)}
                                    {producto.precioOferta !== null && producto.precioOferta !== undefined && (
                                        <Badge bg="danger" className="ms-2">Oferta</Badge>
                                    )}
                                </td>
                                <td>
                                    {producto.stock}
                                    {esCritico(producto) && <Badge bg="danger" className="ms-2">Crítico</Badge>}
                                </td>
                                <td className="text-nowrap">
                                    <Button as={Link} to={`/admin/productos/editar/${producto.id}`}
                                        size="sm" variant="outline-warning" className="me-2">
                                        Editar
                                    </Button>
                                    <Button size="sm" variant="outline-danger"
                                        aria-label={`Eliminar ${producto.nombre}`}
                                        onClick={() => confirmarEliminar(producto)}>
                                        Eliminar
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

export default AdminProductos;