import { useState } from 'react';
import { Container, Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CampoFormulario from '../components/CampoFormulario';
import {
    validarRun, validarTexto, validarCorreo, validarContrasena,
    validarFecha, validarSelect, hayErrores
} from '../utils/validaciones';
import { regiones, comunasDe } from '../data/regiones';
import { crearUsuario, obtenerUsuarioPorCorreo } from '../data/usuariosService';

// formulario de registro de usuario valida los campos y crea el usuario en el localstorage.
const DATOS_VACIOS = {
    run: '', nombre: '', apellidos: '', correo: '', contrasena: '',
    fechaNacimiento: '', region: '', comuna: '', direccion: ''
};

function Registro() {
    // ===== ESTADO =====
    const [datos, setDatos] = useState(DATOS_VACIOS);
    const [errores, setErrores] = useState({});
    const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

    // Las comunas dependen de la región elegida 
    const comunas = comunasDe(datos.region);

    // Qué regla usa cada campo
    function validarCampo(nombre, valor) {
        switch (nombre) {
            case 'run': return validarRun(valor.trim());
            case 'nombre': return validarTexto(valor.trim(), 'Nombre', 50);
            case 'apellidos': return validarTexto(valor.trim(), 'Apellidos', 100);
            case 'correo': return validarCorreo(valor.trim());
            case 'contrasena': return validarContrasena(valor);
            case 'fechaNacimiento': return validarFecha(valor);
            case 'region': return validarSelect(valor, 'Selecciona una región.');
            case 'comuna': return validarSelect(valor, 'Selecciona una comuna.');
            case 'direccion': return validarTexto(valor.trim(), 'Dirección', 300);
            default: return '';
        }
    }

    // ===== EN TIEMPO REAL =====
    function manejarCambio(evento) {
        const { name, value } = evento.target;

        if (name === 'region') {
            // Al cambiar la región, la comuna se reinicia
            setDatos({ ...datos, region: value, comuna: '' });
        } else {
            setDatos({ ...datos, [name]: value });
        }

        setErrores({ ...errores, [name]: validarCampo(name, value) });
        setMensaje({ tipo: '', texto: '' });
    }

    // ===== AL ENVIAR =====
    function manejarEnvio(evento) {
        evento.preventDefault();

        // Valida TODOS los campos
        const nuevosErrores = {};
        Object.keys(DATOS_VACIOS).forEach(campo => {
            nuevosErrores[campo] = validarCampo(campo, datos[campo]);
        });
        setErrores(nuevosErrores);

        if (hayErrores(nuevosErrores)) {
            setMensaje({ tipo: 'danger', texto: 'Revisa los campos marcados en rojo.' });
            return;
        }

        // Regla de negocio: correo único
        if (obtenerUsuarioPorCorreo(datos.correo.trim())) {
            setErrores({ ...nuevosErrores, correo: 'Ya existe una cuenta con este correo.' });
            return;
        }

        // Regla de negocio: RUN único (crearUsuario devuelve null si ya existe)
        const nuevo = crearUsuario({
            ...datos,
            run: datos.run.trim(),
            nombre: datos.nombre.trim(),
            apellidos: datos.apellidos.trim(),
            correo: datos.correo.trim(),
            direccion: datos.direccion.trim()
        });

        if (!nuevo) {
            setErrores({ ...nuevosErrores, run: 'Ya existe una cuenta con este RUN.' });
            return;
        }

        setMensaje({ tipo: 'success', texto: '¡Cuenta creada con éxito! Ya puedes iniciar sesión.' });
        setDatos(DATOS_VACIOS);
        setErrores({});
    }

    return (
        <Container className="my-5 contenedor-formulario-ancho">
            <Card bg="dark" text="white" className="tarjeta-formulario">
                <Card.Body>
                    <h1 className="text-warning h3 mb-4">Crear cuenta</h1>

                    {mensaje.texto && (
                        <Alert variant={mensaje.tipo}>
                            {mensaje.texto}{' '}
                            {mensaje.tipo === 'success' && <Link to="/login">Ir a iniciar sesión</Link>}
                        </Alert>
                    )}

                    <Form noValidate onSubmit={manejarEnvio}>
                        <CampoFormulario etiqueta="RUN" nombre="run" placeholder="Sin puntos ni guion. Ej: 123456785"
                            valor={datos.run} error={errores.run} onChange={manejarCambio} />

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
                                <CampoFormulario etiqueta="Correo electrónico" nombre="correo" tipo="email" placeholder="ejemplo@duoc.cl"
                                    valor={datos.correo} error={errores.correo} onChange={manejarCambio} />
                            </Col>
                            <Col md={6}>
                                <CampoFormulario etiqueta="Contraseña" nombre="contrasena" tipo="password" placeholder="Entre 4 y 10 caracteres"
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
                                        {regiones.map(r => (
                                            <option key={r.nombre} value={r.nombre}>{r.nombre}</option>
                                        ))}
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
                                        {comunas.map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">{errores.comuna}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <CampoFormulario etiqueta="Dirección" nombre="direccion" placeholder="Calle, número, depto."
                            valor={datos.direccion} error={errores.direccion} onChange={manejarCambio} />

                        <Button type="submit" variant="warning" className="w-100">
                            Registrarme
                        </Button>
                    </Form>

                    <p className="mt-3 mb-0">
                        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                    </p>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Registro;