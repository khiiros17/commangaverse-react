// ============================================================
//  PRUEBAS: páginas Pago exitoso y Pago con error
// ============================================================
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PagoExitoso from './PagoExitoso';
import PagoError from './PagoError';
import { crearOrden } from '../data/ordenesService';

const cliente = {
    nombre: 'Ana', apellidos: 'Pérez', correo: 'ana@duoc.cl',
    region: 'Región Metropolitana', comuna: 'Santiago', direccion: 'Calle 123', indicaciones: ''
};
const items = [{ id: 1, nombre: 'Spider-Man #1', precio: 12990, cantidad: 2, subtotal: 25980 }];

function dibujarEn(direccion) {
    return render(
        <MemoryRouter initialEntries={[direccion]}>
            <Routes>
                <Route path="/pago-exitoso/:id" element={<PagoExitoso />} />
                <Route path="/pago-error/:id" element={<PagoError />} />
            </Routes>
        </MemoryRouter>
    );
}

describe('Páginas de resultado del pago', () => {

    beforeEach(() => {
        localStorage.clear();
    });

    it('Pago exitoso debería mostrar la boleta con el número y el total', () => {
        const orden = crearOrden({ cliente, items, total: 25980, tarjeta: '1111', estado: 'Pagada' });

        dibujarEn(`/pago-exitoso/${orden.id}`);

        expect(screen.getByText(`Boleta — Orden #${orden.id}`)).toBeTruthy();
        expect(screen.getByTestId('total-orden').textContent).toBe('$25.980');
        expect(screen.getByText(/terminada en 1111/)).toBeTruthy();
    });

    it('Pago exitoso NO debería mostrar boleta de una orden rechazada', () => {
        const orden = crearOrden({ cliente, items, total: 25980, tarjeta: '0000', estado: 'Rechazada' });

        dibujarEn(`/pago-exitoso/${orden.id}`);

        expect(screen.getByText(/No encontramos una compra pagada/)).toBeTruthy();
    });

    it('Pago con error debería avisar y ofrecer volver a intentar', () => {
        const orden = crearOrden({ cliente, items, total: 25980, tarjeta: '0000', estado: 'Rechazada' });

        dibujarEn(`/pago-error/${orden.id}`);

        expect(screen.getByText(/No se pudo realizar el pago/)).toBeTruthy();
        expect(screen.getByText('Volver a intentar el pago')).toBeTruthy();
    });

});