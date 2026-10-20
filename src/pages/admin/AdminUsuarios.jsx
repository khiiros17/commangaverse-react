import { useState } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { obtenerUsuarios, eliminarUsuario } from '../../data/usuariosService';
import { obtenerOrdenesDeUsuario } from '../../data/ordenesService';

// Color de la etiqueta según el tipo de usuario
const COLORES_TIPO = { Administrador: 'warning', Vendedor: 'info', Cliente: 'secondary' };

function AdminUsuarios({ usuarioSesion }) {
    // ===== ESTADO: la lista se guarda aquí para poder refrescarla al eliminar =====
    const [usuarios, setUsuarios] = useState(() => obtenerUsuarios());

    function confirmarEliminar(usuario) {
        if (window.confirm(`¿Seguro que quieres eliminar a ${usuario.nombre} ${usuario.apellidos}?`)) {
            eliminarUsuario(usuario.run);
            setUsuarios(obtenerUsuarios());
        }
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                <h1 className="text-warning h2 mb-0">Usuarios</h1>
                <Button as={Link} to="/admin/usuarios/nuevo" variant="warning">+ Nuevo usuario</Button>
            </div>

            <Table variant="dark" responsive hover className="align-middle">
                <thead>
                    <tr>
                        <th>RUN</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Tipo</th>
                        <th>Compras</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => {
                        // Regla: nadie puede eliminarse a sí mismo
                        const esYo = usuarioSesion && usuarioSesion.run === usuario.run;

                        return (
                            <tr key={usuario.run}>
                                <td>{usuario.run}</td>
                                <td>{usuario.nombre} {usuario.apellidos} {esYo && <small className="text-secondary">(tú)</small>}</td>
                                <td>{usuario.correo}</td>
                                <td><Badge bg={COLORES_TIPO[usuario.tipo] || 'secondary'}>{usuario.tipo}</Badge></td>
                                <td>{obtenerOrdenesDeUsuario(usuario.correo).length}</td>
                                <td className="text-nowrap">
                                    <Button as={Link} to={`/admin/usuarios/${usuario.run}/historial`}
                                        size="sm" variant="outline-light" className="me-2">
                                        Historial
                                    </Button>
                                    <Button as={Link} to={`/admin/usuarios/editar/${usuario.run}`}
                                        size="sm" variant="outline-warning" className="me-2">
                                        Editar
                                    </Button>
                                    <Button size="sm" variant="outline-danger"
                                        aria-label={`Eliminar ${usuario.nombre}`}
                                        disabled={esYo}
                                        onClick={() => confirmarEliminar(usuario)}>
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
}

export default AdminUsuarios;