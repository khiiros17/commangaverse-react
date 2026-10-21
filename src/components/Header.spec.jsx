// pruebas unitaria del header
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

function dibujarHeader(usuario) {
    return render(
        <MemoryRouter>
            <Header cantidadCarrito={3} usuario={usuario} onLogout={() => { }} />
        </MemoryRouter>
    );
}

describe('Header', () => {

    it('debería mostrar Iniciar sesión y la cantidad del carrito si no hay sesión', () => {
        dibujarHeader(null);
        expect(screen.getByText('Iniciar sesión')).toBeTruthy();
        expect(screen.getByText('3')).toBeTruthy();
    });

    it('NO debería mostrar el Panel admin a un Cliente', () => {
        dibujarHeader({ nombre: 'Ana', tipo: 'Cliente' });
        expect(screen.getByText('Hola, Ana')).toBeTruthy();
        expect(screen.queryByText(/Panel admin/)).toBeNull();
    });

    it('debería mostrar el Panel admin al Administrador', () => {
        dibujarHeader({ nombre: 'Admin', tipo: 'Administrador' });
        expect(screen.getByText(/Panel admin/)).toBeTruthy();
    });

});