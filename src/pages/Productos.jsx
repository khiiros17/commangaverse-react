import { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import ListaProductos from '../components/ListaProductos';

function Productos({ productos, onAgregar }) {
    // Estado lo que la persona escribe en el buscador
    const [busqueda, setBusqueda] = useState('');

    // Filtra los productos cuyo nombre contenga lo buscado
    const productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <Container className="my-5">
            <h1 className="text-warning mb-4">Todos los productos</h1>

            <Form.Control
                type="search"
                placeholder="Buscar cómics o mangas..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="mb-3"
            />

            <p className="text-secondary">
                {productosFiltrados.length} producto(s) encontrado(s)
            </p>

            <ListaProductos productos={productosFiltrados} onAgregar={onAgregar} />
        </Container>
    );
}

export default Productos;