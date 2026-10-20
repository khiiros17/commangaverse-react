// ============================================================
//  PRUEBAS: componente ListaProductos
// ============================================================
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ListaProductos from './ListaProductos';

// Imagen de 1x1 pixel, para no depender de archivos reales en las pruebas
const IMAGEN_PRUEBA = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

const productosDePrueba = [
    { id: 1, nombre: 'Spider-Man #1', precio: 12990, categoria: 'Superhéroes', imagen: IMAGEN_PRUEBA },
    { id: 2, nombre: 'Naruto Vol. 1', precio: 8490, categoria: 'Manga', imagen: IMAGEN_PRUEBA },
    { id: 3, nombre: 'One Piece Vol. 1', precio: 8990, categoria: 'Manga', imagen: IMAGEN_PRUEBA }
];

describe('ListaProductos', () => {

    // PRUEBA DE RENDERIZADO: dibuja TODOS los elementos de la lista
    it('debería mostrar una tarjeta por cada producto', () => {
        render(
            <MemoryRouter>
                <ListaProductos productos={productosDePrueba} onAgregar={() => { }} />
            </MemoryRouter>
        );

        expect(screen.getByText('Spider-Man #1')).toBeTruthy();
        expect(screen.getByText('Naruto Vol. 1')).toBeTruthy();
        expect(screen.getByText('One Piece Vol. 1')).toBeTruthy();
        expect(screen.getAllByText('Añadir al carrito').length).toBe(3);
    });

    // PRUEBA DE RENDERIZADO CONDICIONAL: el mensaje solo aparece si la lista está vacía
    it('debería mostrar un mensaje si no hay productos', () => {
        render(
            <MemoryRouter>
                <ListaProductos productos={[]} onAgregar={() => { }} />
            </MemoryRouter>
        );

        expect(screen.getByText('No hay productos para mostrar.')).toBeTruthy();
    });

    it('NO debería mostrar el mensaje de lista vacía si hay productos', () => {
        render(
            <MemoryRouter>
                <ListaProductos productos={productosDePrueba} onAgregar={() => { }} />
            </MemoryRouter>
        );

        expect(screen.queryByText('No hay productos para mostrar.')).toBeNull();
    });

});