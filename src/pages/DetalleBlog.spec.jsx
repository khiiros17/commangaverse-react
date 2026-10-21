// pruebas unitarias para la página de detalle de blog
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import DetalleBlog from './DetalleBlog';
import { blogs } from '../data/blogs';

function dibujarEn(direccion) {
    return render(
        <MemoryRouter initialEntries={[direccion]}>
            <Routes>
                <Route path="/blogs/:id" element={<DetalleBlog />} />
            </Routes>
        </MemoryRouter>
    );
}

describe('Página DetalleBlog', () => {

    it('debería mostrar el título del blog según el id de la dirección', () => {
        dibujarEn('/blogs/1');
        expect(screen.getByText(blogs[0].titulo)).toBeTruthy();
    });

    it('debería avisar si el blog no existe', () => {
        dibujarEn('/blogs/999');
        expect(screen.getByText('El artículo que buscas no existe.')).toBeTruthy();
    });

});