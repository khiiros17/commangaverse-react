import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AdminPerfil({ usuarioSesion }) {
    return (
        <>
            <h1 className="text-warning h2 mb-4">Mi perfil</h1>

            <Card bg="dark" text="white" className="tarjeta-formulario perfil">
                <Card.Body>
                    <Card.Title className="fs-3">
                        {usuarioSesion.nombre} {usuarioSesion.apellidos}{' '}
                        <Badge bg="warning" text="dark">{usuarioSesion.tipo}</Badge>
                    </Card.Title>

                    <p className="mb-1"><strong>RUN:</strong> {usuarioSesion.run}</p>
                    <p className="mb-1"><strong>Correo:</strong> {usuarioSesion.correo}</p>
                    <p className="mb-3">
                        <strong>Dirección:</strong> {usuarioSesion.direccion}, {usuarioSesion.comuna}, {usuarioSesion.region}
                    </p>

                    <Button as={Link} to={`/admin/usuarios/editar/${usuarioSesion.run}`} variant="warning">
                        Editar mis datos
                    </Button>
                </Card.Body>
            </Card>
        </>
    );
}

export default AdminPerfil;