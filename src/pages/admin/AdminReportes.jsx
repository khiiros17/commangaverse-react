import { Row, Col, Card, Table, ProgressBar } from 'react-bootstrap';
import { obtenerOrdenes } from '../../data/ordenesService';
import { productosMasVendidos, ventasPorCategoria } from '../../utils/reportes';
import { formatearPrecio } from '../../utils/formato';

function AdminReportes({ productos }) {
    const ordenes = obtenerOrdenes();
    const masVendidos = productosMasVendidos(ordenes, 5);
    const porCategoria = ventasPorCategoria(ordenes, productos);


    const totalVentas = porCategoria.reduce((suma, c) => suma + c.total, 0);

    return (
        <>
            <h1 className="text-warning h2 mb-4">Reportes</h1>

            {totalVentas === 0 ? (
                <p className="text-secondary">Todavía no hay ventas pagadas para mostrar reportes.</p>
            ) : (
                <Row className="g-4">

                    <Col lg={6}>
                        <Card bg="dark" text="white" className="h-100">
                            <Card.Body>
                                <Card.Title className="text-warning">Ventas por categoría</Card.Title>
                                {porCategoria.map(({ categoria, total }) => {
                                    const porcentaje = Math.round((total / totalVentas) * 100);
                                    return (
                                        <div key={categoria} className="mb-3">
                                            <div className="d-flex justify-content-between">
                                                <span>{categoria}</span>
                                                <span>{formatearPrecio(total)} ({porcentaje}%)</span>
                                            </div>
                                            <ProgressBar now={porcentaje} variant="warning" aria-label={`${categoria}: ${porcentaje}%`} />
                                        </div>
                                    );
                                })}
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* mas vendidos */}
                    <Col lg={6}>
                        <Card bg="dark" text="white" className="h-100">
                            <Card.Body>
                                <Card.Title className="text-warning">Top 5 más vendidos</Card.Title>
                                <Table variant="dark" size="sm" className="mb-0">
                                    <thead>
                                        <tr><th>#</th><th>Producto</th><th>Unidades</th><th>Total</th></tr>
                                    </thead>
                                    <tbody>
                                        {masVendidos.map((item, indice) => (
                                            <tr key={item.id}>
                                                <td>{indice + 1}</td>
                                                <td>{item.nombre}</td>
                                                <td>{item.cantidad}</td>
                                                <td>{formatearPrecio(item.total)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    );
}

export default AdminReportes;