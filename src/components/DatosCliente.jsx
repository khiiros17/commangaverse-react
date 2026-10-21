// datos clientes  para pedidos.
function DatosCliente({ orden }) {
    const { cliente } = orden;

    return (
        <>
            <p className="mb-1"><strong>Cliente:</strong> {cliente.nombre} {cliente.apellidos} ({cliente.correo})</p>
            <p className="mb-1"><strong>Entrega:</strong> {cliente.direccion}, {cliente.comuna}, {cliente.region}</p>
            {cliente.indicaciones && <p className="mb-1"><strong>Indicaciones:</strong> {cliente.indicaciones}</p>}
            <p className="mb-3"><strong>Tarjeta:</strong> terminada en {orden.tarjeta}</p>
        </>
    );
}

export default DatosCliente;