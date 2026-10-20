// ============================================================
//  PRUEBAS: usuarios del panel admin (listado, eliminar, historial)
// ============================================================
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AdminUsuarios from './AdminUsuarios';
import HistorialUsuario from './HistorialUsuario';
import { crearUsuario } from '../../data/usuariosService';
import { crearOrden } from '../../data/ordenesService';

// El admin que "inició sesión" (es el usuario inicial)
const admin = { run: '111111111', nombre: 'Admin', tipo: 'Administrador' };

function dibujarEn(direccion) {
    return render(
        <MemoryRouter initialEntries={[direccion]}>
            <Routes>
                <Route path="/admin/usuarios" element={<AdminUsuarios usuarioSesion={admin} />} />
                <Route path="/admin/usuarios/:run/historial" element={<HistorialUsuario />} />
            </Routes>
        </MemoryRouter>
    );
}

describe('Admin: usuarios', () => {

    beforeEach(() => {
        localStorage.clear();
        crearUsuario({
            run: '123456785', nombre: 'Ana', apellidos: 'Pérez', correo: 'ana@duoc.cl',
            contrasena: '1234', region: 'Región Metropolitana', comuna: 'Santiago', direccion: 'Calle 1'
        });
    });

    it('debería listar los usuarios con su tipo', () => {
        dibujarEn('/admin/usuarios');
        expect(screen.getByText('ana@duoc.cl')).toBeTruthy();
        expect(screen.getByText('Cliente')).toBeTruthy();
        expect(screen.getByText('Administrador')).toBeTruthy();
    });

    // REGLA DE NEGOCIO: nadie puede eliminarse a sí mismo
    it('NO debería permitir que el admin se elimine a sí mismo', () => {
        dibujarEn('/admin/usuarios');
        expect(screen.getByLabelText('Eliminar Admin').disabled).toBeTrue();
    });

    it('debería eliminar un usuario al confirmar y sacarlo de la lista', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        dibujarEn('/admin/usuarios');

        fireEvent.click(screen.getByLabelText('Eliminar Ana'));

        expect(screen.queryByText('ana@duoc.cl')).toBeNull();
    });

    it('debería mostrar el historial de compras SOLO de ese usuario', () => {
        const items = [{ id: 1, nombre: 'Spider-Man #1', precio: 1000, cantidad: 2, subtotal: 2000 }];
        crearOrden({ cliente: { nombre: 'Ana', correo: 'ana@duoc.cl' }, items, total: 2000, estado: 'Pagada' });
        crearOrden({ cliente: { nombre: 'Otro', correo: 'otro@gmail.com' }, items, total: 2000, estado: 'Pagada' });

        dibujarEn('/admin/usuarios/123456785/historial');

        expect(screen.getByText('Historial de Ana Pérez')).toBeTruthy();
        expect(screen.getByText('#1')).toBeTruthy();
        expect(screen.queryByText('#2')).toBeNull();     // la orden del otro cliente no aparece
        expect(screen.getByText('Spider-Man #1 × 2')).toBeTruthy();
    });

});