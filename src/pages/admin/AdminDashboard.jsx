import { Row, Col, Card, Table, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { obtenerOrdenes } from '../../data/ordenesService';
import { obtenerUsuarios } from '../../data/usuariosService';
import { resumenTienda } from '../../utils/reportes';
import { esCritico } from '../../utils/validacionesProducto';
import { formatearPrecio } from '../../utils/formato';

// Una tarjeta con un número grande (molécula pequeña, solo se usa aquí)
function TarjetaDato({ titulo, valor, color = 'warning' }) {
    return (
        <Card bg="dark" text="white" className={`h-100 tarjeta-dato border-${color}`}>
            <Card.Body>
                <Card.Text className="text-secondary mb-1">{titulo}</Card.Text>
                <p className={`fs-2 fw-bold mb-0 text-${color}`}>{valor}</p>
            </Card.Body>
        </Card>
    );
}

function AdminDashboard({ productos }) {
    const resumen = resumenTienda(productos, obtenerOrdenes(), obtenerUsuarios());
    const criticos = productos.filter(esCritico);

    return (
        <>
            <h1 className="text-warning h2 mb-4">Dashboard</h1>

            <Row className="g-3 mb-4">
                <Col xs={6} xl={3}><TarjetaDato titulo="Ventas totales" valor={formatearPrecio(resumen.ventasTotales)} color="success" /></Col>
                <Col xs={6} xl={3}><TarjetaDato titulo="Órdenes pagadas" valor={resumen.ordenesPagadas} /></Col>
                <Col xs={6} xl={3}><TarjetaDato titulo="Productos" valor={resumen.totalProductos} /></Col>
                <Col xs={6} xl={3}><TarjetaDato titulo="Usuarios" valor={resumen.totalUsuarios} /></Col>
            </Row>

            <h2 className="h4 text-warning mb-3">
                Stock crítico <Badge bg="danger">{resumen.productosCriticos}</Badge>
            </h2>

            {criticos.length === 0 ? (
                <p className="text-secondary">Todos los productos tienen stock suficiente. 👍</p>
            ) : (
                <Table variant="dark" responsive>
                    <thead>
                        <tr><th>Código</th><th>Producto</th><th>Stock</th><th>Stock crítico</th><th></th></tr>
                    </thead>
                    <tbody>
                        {criticos.map(p => (
                            <tr key={p.id}>
                                <td>{p.codigo}</td>
                                <td>{p.nombre}</td>
                                <td className="text-danger fw-bold">{p.stock}</td>
                                <td>{p.stockCritico}</td>
                                <td><Link to={`/admin/productos/editar/${p.id}`}>Reponer</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
}

export default AdminDashboard;