import { useState } from 'react';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CampoFormulario from '../../components/CampoFormulario';
import { validarCampoProducto, validarProducto, codigoRepetido } from '../../utils/validacionesProducto';
import { hayErrores } from '../../utils/validaciones';

const DATOS_VACIOS = {
    codigo: '', nombre: '', descripcion: '', precio: '', precioOferta: '',
    stock: '', stockCritico: '', categoria: '', imagen: ''
};


function productoAFormulario(producto) {
    return {
        codigo: producto.codigo,
        nombre: producto.nombre,
        descripcion: producto.descripcion || '',
        precio: String(producto.precio),
        precioOferta: producto.precioOferta === null || producto.precioOferta === undefined ? '' : String(producto.precioOferta),
        stock: String(producto.stock),
        stockCritico: producto.stockCritico === null || producto.stockCritico === undefined ? '' : String(producto.stockCritico),
        categoria: producto.categoria,
        imagen: producto.imagen || ''
    };
}


function FormularioProducto({ productos, onGuardar }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const editando = id !== undefined;
    const productoActual = editando ? productos.find(p => p.id === Number(id)) : null;


    const [datos, setDatos] = useState(() =>
        productoActual ? productoAFormulario(productoActual) : DATOS_VACIOS
    );
    const [errores, setErrores] = useState({});


    const categorias = [...new Set(productos.map(p => p.categoria))];


    function manejarCambio(evento) {
        const { name, value } = evento.target;
        const nuevosDatos = { ...datos, [name]: value };
        setDatos(nuevosDatos);

        const nuevosErrores = { ...errores, [name]: validarCampoProducto(name, value, nuevosDatos) };


        if (name === 'precio') {
            nuevosErrores.precioOferta = validarCampoProducto('precioOferta', nuevosDatos.precioOferta, nuevosDatos);
        }
        setErrores(nuevosErrores);
    }


    function manejarEnvio(evento) {
        evento.preventDefault();

        const nuevosErrores = validarProducto(datos);


        if (!nuevosErrores.codigo && codigoRepetido(productos, datos.codigo, editando ? Number(id) : null)) {
            nuevosErrores.codigo = 'Ya existe otro producto con este código.';
        }

        setErrores(nuevosErrores);
        if (hayErrores(nuevosErrores)) {
            return;
        }


        const producto = {
            codigo: datos.codigo.trim().toUpperCase(),
            nombre: datos.nombre.trim(),
            descripcion: datos.descripcion.trim(),
            precio: Number(datos.precio),
            precioOferta: datos.precioOferta === '' ? null : Number(datos.precioOferta),
            stock: Number(datos.stock),
            stockCritico: datos.stockCritico === '' ? null : Number(datos.stockCritico),
            categoria: datos.categoria.trim(),
            imagen: datos.imagen.trim() || '/img/logo.png'
        };

        onGuardar(producto, editando ? Number(id) : null);
        navigate('/admin/productos');
    }


    if (editando && !productoActual) {
        return (
            <>
                <Alert variant="danger">El producto que quieres editar no existe.</Alert>
                <Link to="/admin/productos">← Volver a productos</Link>
            </>
        );
    }

    return (
        <>
            <h1 className="text-warning h2 mb-4">
                {editando ? `Editar: ${productoActual.nombre}` : 'Nuevo producto'}
            </h1>

            <Card bg="dark" text="white" className="tarjeta-formulario">
                <Card.Body>
                    <Form noValidate onSubmit={manejarEnvio}>
                        <Row>
                            <Col md={4}>
                                <CampoFormulario etiqueta="Código" nombre="codigo" placeholder="Ej: MAN-003"
                                    valor={datos.codigo} error={errores.codigo} onChange={manejarCambio} />
                            </Col>
                            <Col md={8}>
                                <CampoFormulario etiqueta="Nombre" nombre="nombre"
                                    valor={datos.nombre} error={errores.nombre} onChange={manejarCambio} />
                            </Col>
                        </Row>

                        <CampoFormulario etiqueta="Descripción (opcional)" nombre="descripcion" multilinea
                            ayuda={`${datos.descripcion.length}/500 caracteres`}
                            valor={datos.descripcion} error={errores.descripcion} onChange={manejarCambio} />

                        <Row>
                            <Col md={6}>
                                <CampoFormulario etiqueta="Precio" nombre="precio" tipo="number" placeholder="Ej: 9990"
                                    valor={datos.precio} error={errores.precio} onChange={manejarCambio} />
                            </Col>
                            <Col md={6}>
                                <CampoFormulario etiqueta="Precio oferta (opcional)" nombre="precioOferta" tipo="number"
                                    placeholder="Vacío = sin oferta"
                                    valor={datos.precioOferta} error={errores.precioOferta} onChange={manejarCambio} />
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <CampoFormulario etiqueta="Stock" nombre="stock" tipo="number"
                                    valor={datos.stock} error={errores.stock} onChange={manejarCambio} />
                            </Col>
                            <Col md={6}>
                                <CampoFormulario etiqueta="Stock crítico (opcional)" nombre="stockCritico" tipo="number"
                                    ayuda="Avisa cuando el stock llegue a este número."
                                    valor={datos.stockCritico} error={errores.stockCritico} onChange={manejarCambio} />
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>

                                <Form.Group className="mb-3" controlId="categoria">
                                    <Form.Label>Categoría</Form.Label>
                                    <Form.Control name="categoria" list="lista-categorias" value={datos.categoria}
                                        onChange={manejarCambio} isInvalid={!!errores.categoria}
                                        placeholder="Elige o escribe una nueva" />
                                    <datalist id="lista-categorias">
                                        {categorias.map(c => <option key={c} value={c} />)}
                                    </datalist>
                                    <Form.Control.Feedback type="invalid">{errores.categoria}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <CampoFormulario etiqueta="Imagen (opcional)" nombre="imagen" placeholder="/img/mi-comic.jpg"
                                    valor={datos.imagen} error={errores.imagen} onChange={manejarCambio} />
                            </Col>
                        </Row>

                        <div className="d-flex gap-2">
                            <Button type="submit" variant="warning">
                                {editando ? 'Guardar cambios' : 'Crear producto'}
                            </Button>
                            <Button as={Link} to="/admin/productos" variant="outline-light">Cancelar</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
}

export default FormularioProducto;