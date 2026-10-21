// pruebas unitarias de laruta de admin
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import RutaAdmin from './RutaAdmin';

function dibujarCon(usuario) {
    return render(
        <MemoryRouter initialEntries={['/admin']}>
            <Routes>
                <Route path="/admin" element={<RutaAdmin usuario={usuario}><p>Contenido secreto</p></RutaAdmin>} />
                <Route path="/login" element={<p>Página de login</p>} />
            </Routes>
        </MemoryRouter>
    );
}

describe('RutaAdmin', () => {

    it('debería mandar al login si no hay sesión', () => {
        dibujarCon(null);
        expect(screen.getByText('Página de login')).toBeTruthy();
        expect(screen.queryByText('Contenido secreto')).toBeNull();
    });

    it('debería mandar al login si el usuario es Cliente', () => {
        dibujarCon({ nombre: 'Ana', tipo: 'Cliente' });
        expect(screen.getByText('Página de login')).toBeTruthy();
    });

    it('debería dejar pasar al Administrador', () => {
        dibujarCon({ nombre: 'Admin', tipo: 'Administrador' });
        expect(screen.getByText('Contenido secreto')).toBeTruthy();
    });

});