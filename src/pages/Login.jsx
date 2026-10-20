import { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CampoFormulario from '../components/CampoFormulario';
import { validarCorreo, validarContrasena, hayErrores } from '../utils/validaciones';
import { iniciarSesion } from '../data/sesionService';

function Login({ onLogin }) {
    const navigate = useNavigate();

    // ===== ESTADO =====
    const [datos, setDatos] = useState({ correo: '', contrasena: '' });
    const [errores, setErrores] = useState({ correo: '', contrasena: '' });
    const [mensajeError, setMensajeError] = useState('');

    // Qué regla usa cada campo
    function validarCampo(nombre, valor) {
        if (nombre === 'correo') return validarCorreo(valor.trim());
        if (nombre === 'contrasena') return validarContrasena(valor);
        return '';
    }

    // ===== EN TIEMPO REAL: cada letra actualiza el dato y su error =====
    function manejarCambio(evento) {
        const { name, value } = evento.target;
        setDatos({ ...datos, [name]: value });
        setErrores({ ...errores, [name]: validarCampo(name, value) });
        setMensajeError('');
    }

    // ===== AL ENVIAR =====
    function manejarEnvio(evento) {
        evento.preventDefault();

        const nuevosErrores = {
            correo: validarCampo('correo', datos.correo),
            contrasena: validarCampo('contrasena', datos.contrasena)
        };
        setErrores(nuevosErrores);

        if (hayErrores(nuevosErrores)) {
            return;
        }

        const usuario = iniciarSesion(datos.correo.trim(), datos.contrasena);
        if (!usuario) {
            setMensajeError('Correo o contraseña incorrectos.');
            return;
        }

        onLogin(usuario);

        // ⬅️ CAMBIO: el administrador va directo a su panel
        if (usuario.tipo === 'Administrador') {
            navigate('/admin');
        } else {
            navigate('/');
        }
    }

    return (
        <Container className="my-5 contenedor-formulario">
            <Card bg="dark" text="white" className="tarjeta-formulario">
                <Card.Body>
                    <h1 className="text-warning h3 mb-4">Iniciar sesión</h1>

                    {mensajeError && <Alert variant="danger">{mensajeError}</Alert>}

                    <Form noValidate onSubmit={manejarEnvio}>
                        <CampoFormulario
                            etiqueta="Correo electrónico"
                            nombre="correo"
                            tipo="email"
                            placeholder="ejemplo@duoc.cl"
                            valor={datos.correo}
                            error={errores.correo}
                            onChange={manejarCambio}
                        />
                        <CampoFormulario
                            etiqueta="Contraseña"
                            nombre="contrasena"
                            tipo="password"
                            placeholder="Entre 4 y 10 caracteres"
                            valor={datos.contrasena}
                            error={errores.contrasena}
                            onChange={manejarCambio}
                        />
                        <Button type="submit" variant="warning" className="w-100">
                            Ingresar
                        </Button>
                    </Form>

                    <p className="mt-3 mb-0">
                        ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
                    </p>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Login;