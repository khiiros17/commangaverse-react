import { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import CampoFormulario from '../components/CampoFormulario';
import { validarTexto, validarCorreo, hayErrores } from '../utils/validaciones';

const MAXIMO_COMENTARIO = 500;
const DATOS_VACIOS = { nombre: '', correo: '', comentario: '' };

function Contacto() {
    // estado
    const [datos, setDatos] = useState(DATOS_VACIOS);
    const [errores, setErrores] = useState({ nombre: '', correo: '', comentario: '' });
    const [enviado, setEnviado] = useState(false);

    function validarCampo(nombre, valor) {
        if (nombre === 'nombre') return validarTexto(valor.trim(), 'Nombre', 100);
        if (nombre === 'correo') return validarCorreo(valor.trim(), false);   // opcional
        if (nombre === 'comentario') return validarTexto(valor.trim(), 'Comentario', MAXIMO_COMENTARIO);
        return '';
    }

    function manejarCambio(evento) {
        const { name, value } = evento.target;
        setDatos({ ...datos, [name]: value });
        setErrores({ ...errores, [name]: validarCampo(name, value) });
        setEnviado(false);
    }

    function manejarEnvio(evento) {
        evento.preventDefault();

        const nuevosErrores = {
            nombre: validarCampo('nombre', datos.nombre),
            correo: validarCampo('correo', datos.correo),
            comentario: validarCampo('comentario', datos.comentario)
        };
        setErrores(nuevosErrores);

        if (hayErrores(nuevosErrores)) {
            return;
        }

        setEnviado(true);
        setDatos(DATOS_VACIOS);
    }

    return (
        <Container className="my-5 contenedor-formulario">
            <Card bg="dark" text="white" className="tarjeta-formulario">
                <Card.Body>
                    <h1 className="text-warning h3">Contáctanos</h1>
                    <p className="text-secondary">¿Buscas un cómic o manga en especial? ¡Escríbenos!</p>

                    {enviado && (
                        <Alert variant="success">¡Gracias! Tu mensaje fue enviado. Te responderemos pronto.</Alert>
                    )}

                    <Form noValidate onSubmit={manejarEnvio}>
                        <CampoFormulario
                            etiqueta="Nombre completo"
                            nombre="nombre"
                            valor={datos.nombre}
                            error={errores.nombre}
                            onChange={manejarCambio}
                        />
                        <CampoFormulario
                            etiqueta="Correo electrónico (opcional)"
                            nombre="correo"
                            tipo="email"
                            placeholder="ejemplo@gmail.com"
                            valor={datos.correo}
                            error={errores.correo}
                            onChange={manejarCambio}
                        />
                        <CampoFormulario
                            etiqueta="Comentario"
                            nombre="comentario"
                            multilinea
                            valor={datos.comentario}
                            error={errores.comentario}
                            onChange={manejarCambio}
                            ayuda={`${datos.comentario.length} / ${MAXIMO_COMENTARIO}`}
                        />
                        <Button type="submit" variant="warning" className="w-100">
                            Enviar mensaje
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Contacto;