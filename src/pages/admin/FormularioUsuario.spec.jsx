// pruebas unitarias para la pagina admin.
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import FormularioUsuario from './FormularioUsuario';
import { obtenerUsuarioPorRun } from '../../data/usuariosService';

const admin = { run: '111111111', nombre: 'Admin', tipo: 'Administrador' };

function dibujarEn(direccion, onSesionActualizada = () => { }) {
    return render(
        <MemoryRouter initialEntries={[direccion]}>
            <Routes>
                <Route path="/admin/usuarios/nuevo"
                    element={<FormularioUsuario usuarioSesion={admin} onSesionActualizada={onSesionActualizada} />} />
                <Route path="/admin/usuarios/editar/:run"
                    element={<FormularioUsuario usuarioSesion={admin} onSesionActualizada={onSesionActualizada} />} />
                <Route path="/admin/usuarios" element={<p>Listado de usuarios</p>} />
            </Routes>
        </MemoryRouter>
    );
}

function escribir(etiqueta, texto) {
    fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: texto } });
}


function llenarUsuarioValido(run, correo) {
    escribir('RUN', run);
    escribir('Nombre', 'Ana');
    escribir('Apellidos', 'Pérez');
    escribir('Correo electrónico', correo);
    escribir('Contraseña', '1234');
    escribir('Región', 'Región Metropolitana');
    escribir('Comuna', 'Santiago');
    escribir('Dirección', 'Calle 1');
}

describe('FormularioUsuario', () => {

    beforeEach(() => {
        localStorage.clear();
    });

    it('debería crear un usuario válido y volver al listado', () => {
        dibujarEn('/admin/usuarios/nuevo');

        llenarUsuarioValido('123456785', 'ana@duoc.cl');
        fireEvent.click(screen.getByText('Crear usuario'));

        expect(obtenerUsuarioPorRun('123456785').correo).toBe('ana@duoc.cl');
        expect(screen.getByText('Listado de usuarios')).toBeTruthy();
    });

    it('NO debería crear un usuario con un correo que ya existe', () => {
        dibujarEn('/admin/usuarios/nuevo');

        llenarUsuarioValido('123456785', 'admin@duoc.cl');
        fireEvent.click(screen.getByText('Crear usuario'));

        expect(screen.getByText('Ya existe otro usuario con este correo.')).toBeTruthy();
        expect(obtenerUsuarioPorRun('123456785')).toBeNull();
    });

    it('al editar, debería mantener la contraseña si se deja vacía', () => {
        dibujarEn('/admin/usuarios/editar/111111111');

        expect(screen.getByLabelText('RUN').disabled).toBeTrue();   // el RUN no se cambia
        escribir('Nombre', 'Administrador General');
        fireEvent.click(screen.getByText('Guardar cambios'));

        const guardado = obtenerUsuarioPorRun('111111111');
        expect(guardado.nombre).toBe('Administrador General');
        expect(guardado.contrasena).toBe('admin123');
    });

    it('al editarse a sí mismo, debería actualizar la sesión y no permitir cambiar su tipo', () => {
        const espia = jasmine.createSpy('onSesionActualizada');
        dibujarEn('/admin/usuarios/editar/111111111', espia);

        expect(screen.getByLabelText('Tipo de usuario').disabled).toBeTrue();
        escribir('Nombre', 'Javier');
        fireEvent.click(screen.getByText('Guardar cambios'));

        expect(espia).toHaveBeenCalled();
        expect(espia.calls.mostRecent().args[0].nombre).toBe('Javier');
    });

});