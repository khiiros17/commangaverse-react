import { useState } from 'react';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CampoFormulario from '../../components/CampoFormulario';
import {
    validarRun, validarTexto, validarCorreo, validarContrasena,
    validarFecha, validarSelect, hayErrores
} from '../../utils/validaciones';
import { regiones, comunasDe } from '../../data/regiones';
import {
    obtenerUsuarioPorRun, obtenerUsuarioPorCorreo, crearUsuario, actualizarUsuario
} from '../../data/usuariosService';

const TIPOS = ['Cliente', 'Vendedor', 'Administrador'];

const DATOS_VACIOS = {
    run: '', nombre: '', apellidos: '', correo: '', contrasena: '',
    fechaNacimiento: '', tipo: 'Cliente', region: '', comuna: '', direccion: ''
};

// ============================================================
//  UN SOLO FORMULARIO PARA CREAR Y EDITAR USUARIOS
//  /admin/usuarios/nuevo              → crear
//  /admin/usuarios/editar/111111111   → editar
// ============================================================
function FormularioUsuario({ usuarioSesion, onSesionActualizada }) {
    const { run } = useParams();
    const navigate = useNavigate();

    const editando = run !== undefined;
    const usuarioActual = editando ? obtenerUsuarioPorRun(run) : null;
    const esYo = editando && usuarioSesion && usuarioSesion.run === run;

    // ===== ESTADO =====
    // Al editar, la contraseña parte vacía: si se deja así, se mantiene la anterior
    const [datos, setDatos] = useState(() =>
        usuarioActual ? { ...DATOS_VACIOS, ...usuarioActual, contrasena: '' } : DATOS_VACIOS
    );
    const [errores, setErrores] = useState({});

    const comunas = comunasDe(datos.region);

    function validarCampo(nombre, valor) {
        switch (nombre) {
            case 'run': return editando ? '' : validarRun(valor.trim());
            case 'nombre': return validarTexto(valor.trim(), 'Nombre', 50);
            case 'apellidos': return validarTexto(valor.trim(), 'Apellidos', 100);
            case 'correo': return validarCorreo(valor.trim());
            case 'contrasena': return editando && valor === '' ? '' : validarContrasena(valor);
            case 'fechaNacimiento': return validarFecha(valor);
            case 'tipo': return validarSelect(valor, 'Selecciona un tipo de usuario.');
            case 'region': return validarSelect(valor, 'Selecciona una región.');
            case 'comuna': return validarSelect(valor, 'Selecciona una comuna.');
            case 'direccion': return validarTexto(valor.trim(), 'Dirección', 300);
            default: return '';
        }
    }

    function manejarCambio(evento) {
        const { name, value } = evento.target;

        if (name === 'region') {
            setDatos({ ...datos, region: value, comuna: '' });
        } else {
            setDatos({ ...datos, [name]: value });
        }
        setErrores({ ...errores, [name]: validarCampo(name, value) });
    }

    function manejarEnvio(evento) {
        evento.preventDefault();

        const nuevosErrores = {};
        Object.keys(DATOS_VACIOS).forEach(campo => {
            nuevosErrores[campo] = validarCampo(campo, datos[campo]);
        });

        // Regla de negocio: correo único (sin contar al mismo usuario)
        const duenoCorreo = obtenerUsuarioPorCorreo(datos.correo.trim());
        if (!nuevosErrores.correo && duenoCorreo && duenoCorreo.run !== run) {
            nuevosErrores.correo = 'Ya existe otro usuario con este correo.';
        }

        setErrores(nuevosErrores);
        if (hayErrores(nuevosErrores)) {
            return;
        }

        const datosUsuario = {
            nombre: datos.nombre.trim(),
            apellidos: datos.apellidos.trim(),
            correo: datos.correo.trim(),
            fechaNacimiento: datos.fechaNacimiento,
            tipo: datos.tipo,
            region: datos.region,
            comuna: datos.comuna,
            direccion: datos.direccion.trim()
        };

        // La contraseña solo se guarda si se escribió una
        if (datos.contrasena !== '') {
            datosUsuario.contrasena = datos.contrasena;
        }

        if (editando) {
            const actualizado = actualizarUsuario(run, datosUsuario);
            // Si me edité a mí mismo, se actualiza la sesión (por ejemplo, el nombre del Header)
            if (esYo) {
                onSesionActualizada(actualizado);
            }
        } else {
            const nuevo = crearUsuario({ ...datosUsuario, run: datos.run.trim() });
            // Regla de negocio: RUN único (crearUsuario devuelve null si ya existe)
            if (!nuevo) {
                setErrores({ ...nuevosErrores, run: 'Ya existe un usuario con este RUN.' });
                return;
            }
        }

        navigate('/admin/usuarios');
    }

    if (editando && !usuarioActual) {
        return (
            <>
                <Alert variant="danger">El usuario que quieres editar no existe.</Alert>
                <Link to="/admin/usuarios">← Volver a usuarios</Link>
            </>
        );
    }

    return (
        <>
            <h1 className="text-warning h2 mb-4">
                {editando ? `Editar: ${usuarioActual.nombre} ${usuarioActual.apellidos}` : 'Nuevo usuario'}
            </h1>

            <Card bg="dark" text="white" className="tarjeta-formulario">
                <Card.Body>
                    <Form noValidate onSubmit={manejarEnvio}>
                        <Row>
                            <Col md={6}>
                                {/* El RUN identifica al usuario: no se puede cambiar al editar */}
                                <Form.Group className="mb-3" controlId="run">
                                    <Form.Label>RUN</Form.Label>
                                    <Form.Control name="run" value={datos.run} onChange={manejarCambio}
                                        disabled={editando} placeholder="Sin puntos ni guion. Ej: 123456785"
                                        isInvalid={!!errores.run} />
                                    <Form.Control.Feedback type="invalid">{errores.run}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="tipo">
                                    <Form.Label>Tipo de usuario</Form.Label>
                                    <Form.Select name="tipo" value={datos.tipo} onChange={manejarCambio}
                                        disabled={esYo} isInvalid={!!errores.tipo}>
                                        {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
                                    </Form.Select>
                                    {esYo && <Form.Text className="text-secondary">No puedes cambiar tu propio tipo.</Form.Text>}
                                    <Form.Control.Feedback type="invalid">{errores.tipo}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <CampoFormulario etiqueta="Nombre" nombre="nombre"
                                    valor={datos.nombre} error={errores.nombre} onChange={manejarCambio} />
                            </Col>
                            <Col md={6}>
                                <CampoFormulario etiqueta="Apellidos" nombre="apellidos"
                                    valor={datos.apellidos} error={errores.apellidos} onChange={manejarCambio} />
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <CampoFormulario etiqueta="Correo electrónico" nombre="correo" tipo="email"
                                    valor={datos.correo} error={errores.correo} onChange={manejarCambio} />
                            </Col>
                            <Col md={6}>
                                <CampoFormulario etiqueta="Contraseña" nombre="contrasena" tipo="password"
                                    placeholder={editando ? 'Vacía = no cambiar' : 'Entre 4 y 10 caracteres'}
                                    valor={datos.contrasena} error={errores.contrasena} onChange={manejarCambio} />
                            </Col>
                        </Row>

                        <CampoFormulario etiqueta="Fecha de nacimiento (opcional)" nombre="fechaNacimiento" tipo="date"
                            valor={datos.fechaNacimiento} error={errores.fechaNacimiento} onChange={manejarCambio} />

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="region">
                                    <Form.Label>Región</Form.Label>
                                    <Form.Select name="region" value={datos.region} onChange={manejarCambio}
                                        isInvalid={!!errores.region}>
                                        <option value="">Selecciona una región</option>
                                        {regiones.map(r => <option key={r.nombre} value={r.nombre}>{r.nombre}</option>)}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">{errores.region}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="comuna">
                                    <Form.Label>Comuna</Form.Label>
                                    <Form.Select name="comuna" value={datos.comuna} onChange={manejarCambio}
                                        disabled={comunas.length === 0} isInvalid={!!errores.comuna}>
                                        <option value="">
                                            {comunas.length === 0 ? 'Primero selecciona una región' : 'Selecciona una comuna'}
                                        </option>
                                        {comunas.map(c => <option key={c} value={c}>{c}</option>)}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">{errores.comuna}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <CampoFormulario etiqueta="Dirección" nombre="direccion"
                            valor={datos.direccion} error={errores.direccion} onChange={manejarCambio} />

                        <div className="d-flex gap-2">
                            <Button type="submit" variant="warning">
                                {editando ? 'Guardar cambios' : 'Crear usuario'}
                            </Button>
                            <Button as={Link} to="/admin/usuarios" variant="outline-light">Cancelar</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
}

export default FormularioUsuario;