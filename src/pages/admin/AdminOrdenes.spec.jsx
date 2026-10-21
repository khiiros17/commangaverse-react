
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AdminOrdenes from './AdminOrdenes';
import AdminDetalleOrden from './AdminDetalleOrden';
import { crearOrden } from '../../data/ordenesService';

const cliente = {
    nombre: 'Ana', apellidos: 'Pérez', correo: 'ana@duoc.cl',
    region: 'Región Metropolitana', comuna: 'Santiago', direccion: 'Calle 123', indicaciones: ''
};
const items = [{ id: 1, nombre: 'Spider-Man #1', precio: 12990, cantidad: 1, subtotal: 12990 }];

function dibujarEn(direccion) {
    return render(
        <MemoryRouter initialEntries={[direccion]}>
            <Routes>
                <Route path="/admin/ordenes" element={<AdminOrdenes />} />
                <Route path="/admin/ordenes/:id" element={<AdminDetalleOrden />} />
            </Routes>
        </MemoryRouter>
    );
}

describe('Admin: órdenes', () => {

    beforeEach(() => {
        localStorage.clear();
        crearOrden({ cliente, items, total: 12990, tarjeta: '1111', estado: 'Pagada' });
        crearOrden({ cliente: { ...cliente, nombre: 'Beto' }, items, total: 12990, tarjeta: '0000', estado: 'Rechazada' });
    });

    it('debería listar todas las órdenes', () => {
        dibujarEn('/admin/ordenes');
        expect(screen.getByText('#1')).toBeTruthy();
        expect(screen.getByText('#2')).toBeTruthy();
    });


    it('debería filtrar las órdenes por estado', () => {
        dibujarEn('/admin/ordenes');

        fireEvent.change(screen.getByLabelText('Filtrar por estado'), { target: { value: 'Rechazada' } });

        expect(screen.queryByText('#1')).toBeNull();
        expect(screen.getByText('#2')).toBeTruthy();
    });

    it('debería mostrar la boleta de una orden', () => {
        dibujarEn('/admin/ordenes/1');

        expect(screen.getByText(/Boleta — Orden #1/)).toBeTruthy();
        expect(screen.getByText(/terminada en 1111/)).toBeTruthy();
        expect(screen.getByTestId('total-orden').textContent).toBe('$12.990');
    });

});