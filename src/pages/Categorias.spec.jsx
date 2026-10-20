// ============================================================
//  PRUEBAS: página Categorías (con parámetros de ruta)
// ============================================================
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Categorias from './Categorias';

const IMAGEN_PRUEBA = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

const productos = [
    { id: 1, nombre: 'Spider-Man #1', precio: 12990, precioOferta: null, categoria: 'Superhéroes', imagen: IMAGEN_PRUEBA },
    { id: 2, nombre: 'Naruto Vol. 1', precio: 8490, precioOferta: null, categoria: 'Manga', imagen: IMAGEN_PRUEBA },
    { id: 3, nombre: 'One Piece Vol. 1', precio: 8990, precioOferta: null, categoria: 'Manga', imagen: IMAGEN_PRUEBA }
];

// Dibuja la página como si la persona entrara a una dirección
function dibujarEn(direccion) {
    return render(
        <MemoryRouter initialEntries={[direccion]}>
            <Routes>
                <Route path="/categorias" element={<Categorias productos={productos} onAgregar={() => { }} />} />
                <Route path="/categorias/:nombre" element={<Categorias productos={productos} onAgregar={() => { }} />} />
            </Routes>
        </MemoryRouter>
    );
}

describe('Página Categorías', () => {

    it('debería mostrar todas las categorías sin repetir, con su cantidad', () => {
        dibujarEn('/categorias');

        expect(screen.getByText('Ver Superhéroes')).toBeTruthy();
        expect(screen.getByText('Ver Manga')).toBeTruthy();
        expect(screen.getByText('2 producto(s)')).toBeTruthy();   // Manga tiene 2
    });

    it('debería mostrar solo los productos de la categoría de la dirección', () => {
        dibujarEn('/categorias/Manga');

        expect(screen.getByText('Naruto Vol. 1')).toBeTruthy();
        expect(screen.getByText('One Piece Vol. 1')).toBeTruthy();
        expect(screen.queryByText('Spider-Man #1')).toBeNull();
    });

});