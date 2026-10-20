import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CampoFormulario from '../components/CampoFormulario';
import { validarTexto, validarCorreo, validarSelect, hayErrores } from '../utils/validaciones';
import { validarTarjeta } from '../utils/pago';
import { regiones, comunasDe } from '../data/regiones';
import { detalleCarrito, calcularTotal } from '../utils/carrito';
import { formatearPrecio } from '../utils/formato';

// Si hay sesión, el formulario parte con los datos del usuario
function datosIniciales(usuario) {
    return {
        nombre: usuario?.nombre || '',
        apellidos: usuario?.apellidos || '',
        correo: usuario?.correo || '',
        region: usuario?.region || '',
        comuna: usuario?.comuna || '',
        direccion: usuario?.direccion || '',
        indicaciones: '',
        tarjeta: ''
    };
}

// Campos obligatorios que se validan al enviar
const CAMPOS = ['nombre', 'apellidos', 'correo', 'region', 'comuna', 'direccion', 'tarjeta'];

function Checkout({ carrito, productos, usuario, onConfirmarCompra }) {
    // ===== ESTADO =====
    const [datos, setDatos] = useState(() => datosIniciales(usuario));
    const [errores, setErrores] = useState({});
    const navigate = useNavigate();

    const lineas = detalleCarrito(carrito, productos);
    const total = calcularTotal(carrito, productos);
    const comunas = comunasDe(datos.region);

    function validarCampo(nombre, valor) {
        switch (nombre) {
            case 'nombre': return validarTexto(valor.trim(), 'Nombre', 50);
            case 'apellidos': return validarTexto(valor.trim(), 'Apellidos', 100);
            case 'correo': return validarCorreo(valor.trim());
            case 'region': return validarSelect(valor, 'Selecciona una región.');
            case 'comuna': return validarSelect(valor, 'Selecciona una comuna.');
            case 'direccion': return validarTexto(valor.trim(), 'Dirección', 300);
            case 'tarjeta': return validarTarjeta(valor);
            default: return '';
        }
    }

    // ===== EN TIEMPO REAL =====
    function manejarCambio(evento) {
        const { name, value } = evento.target;

        if (name === 'region') {
            setDatos({ ...datos, region: value, comuna: '' });
        } else {
            setDatos({ ...datos, [name]: value });
        }

        setErrores({ ...errores, [name]: validarCampo(name, value) });
    }

    // ===== AL PAGAR =====
    function manejarEnvio(evento) {
        evento.preventDefault();

        const nuevosErrores = {};
        CAMPOS.forEach(campo => {
            nuevosErrores[campo] = validarCampo(campo, datos[campo]);
        });
        setErrores(nuevosErrores);

        if (hayErrores(nuevosErrores)) {
            return;
        }

        // Datos del cliente (la tarjeta va aparte: no se guarda completa)
        const cliente = {
            nombre: datos.nombre.trim(),
            apellidos: datos.apellidos.trim(),
            correo: datos.correo.trim(),
            region: datos.region,
            comuna: datos.comuna,
            direccion: datos.direccion.trim(),
            indicaciones: datos.indicaciones.trim()
        };

        // La App procesa la compra y nos devuelve la orden
        const orden = onConfirmarCompra(cliente, datos.tarjeta);

        if (orden.estado === 'Pagada') {
            navigate(`/pago-exitoso/${orden.id}`);
        } else {
            navigate(`/pago-error/${orden.id}`);
        }
    }

    // ===== CARRITO VACÍO =====
    if (lineas.length === 0) {
        return (
            <Container className="my-5">
                <h1 className="text-warning mb-4">Checkout</h1>
                <Alert variant="secondary">
                    No hay productos para pagar. <Link to="/productos">Ver productos</Link>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <h1 className="text-warning mb-4">Checkout</h1>

            <Row className="g-4">
                {/* ===== FORMULARIO ===== */}
                <Col lg={8}>
                    <Card bg="dark" text="white" className="tarjeta-formulario">
                        <Card.Body>
                            <Form noValidate onSubmit={manejarEnvio}>
                                <h2 className="h5 text-warning mb-3">Datos del cliente</h2>
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
                                <CampoFormulario etiqueta="Correo electrónico" nombre="correo" tipo="email" placeholder="ejemplo@duoc.cl"
                                    valor={datos.correo} error={errores.correo} onChange={manejarCambio} />

                                <h2 className="h5 text-warning mt-4 mb-3">Dirección de entrega</h2>
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
                                <CampoFormulario etiqueta="Indicaciones para la entrega (opcional)" nombre="indicaciones" multilinea
                                    placeholder="Ej: dejar en conserjería"
                                    valor={datos.indicaciones} error={errores.indicaciones} onChange={manejarCambio} />

                                <h2 className="h5 text-warning mt-4 mb-3">Pago</h2>
                                <CampoFormulario etiqueta="Número de tarjeta" nombre="tarjeta" placeholder="16 números"
                                    ayuda="Pago simulado. Una tarjeta que termina en 0000 será rechazada."
                                    valor={datos.tarjeta} error={errores.tarjeta} onChange={manejarCambio} />

                                <Button type="submit" variant="warning" size="lg" className="w-100 mt-2">
                                    Pagar ahora {formatearPrecio(total)}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                {/* ===== RESUMEN ===== */}
                <Col lg={4}>
                    <Card bg="dark" text="white" className="resumen-carrito">
                        <Card.Body>
                            <Card.Title>Tu pedido</Card.Title>
                            {lineas.map(({ producto, cantidad, subtotal }) => (
                                <p key={producto.id} className="d-flex justify-content-between mb-2">
                                    <span>{producto.nombre} × {cantidad}</span>
                                    <span>{formatearPrecio(subtotal)}</span>
                                </p>
                            ))}
                            <hr />
                            <p className="d-flex justify-content-between fs-4 mb-0">
                                <span>Total:</span>
                                <strong className="precio" data-testid="total-checkout">{formatearPrecio(total)}</strong>
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Checkout;