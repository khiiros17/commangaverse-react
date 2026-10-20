import { Card, Button, Alert } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { obtenerOrdenPorId } from '../../data/ordenesService';
import ResumenOrden from '../../components/ResumenOrden';
import DatosCliente from '../../components/DatosCliente';
import EstadoOrden from '../../components/EstadoOrden';
import { formatearFecha } from '../../utils/fechas';

function AdminDetalleOrden() {
  const { id } = useParams();
  const orden = obtenerOrdenPorId(id);

  if (!orden) {
    return (
      <>
        <Alert variant="danger">La orden que buscas no existe.</Alert>
        <Link to="/admin/ordenes">← Volver a órdenes</Link>
      </>
    );
  }

  return (
    <>
      <Link to="/admin/ordenes" className="no-imprimir">← Volver a órdenes</Link>

      <Card bg="dark" text="white" className="tarjeta-formulario mt-3">
        <Card.Body>
          <Card.Title className="text-warning d-flex align-items-center gap-2">
            Boleta — Orden #{orden.id} <EstadoOrden estado={orden.estado} />
          </Card.Title>
          <p className="text-secondary mb-3">{formatearFecha(orden.fecha)}</p>

          <DatosCliente orden={orden} />
          <ResumenOrden orden={orden} />

          <Button variant="outline-light" className="no-imprimir" onClick={() => window.print()}>
            Imprimir boleta
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default AdminDetalleOrden;