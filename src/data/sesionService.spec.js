// ============================================================
//  PRUEBAS: servicio de sesión
// ============================================================
import { obtenerSesion, iniciarSesion, actualizarSesion, cerrarSesion } from './sesionService';

describe('sesionService', () => {

    beforeEach(() => {
        localStorage.clear();      // usuarios iniciales (admin@duoc.cl / admin123)
        sessionStorage.clear();
    });

    it('debería iniciar sesión con datos correctos y NO guardar la contraseña', () => {
        const usuario = iniciarSesion('admin@duoc.cl', 'admin123');

        expect(usuario.nombre).toBe('Admin');
        expect(usuario.contrasena).toBeUndefined();
        expect(obtenerSesion().correo).toBe('admin@duoc.cl');
    });

    it('debería rechazar una contraseña incorrecta', () => {
        expect(iniciarSesion('admin@duoc.cl', 'otra')).toBeNull();
        expect(obtenerSesion()).toBeNull();
    });

    it('debería actualizar la sesión sin guardar la contraseña', () => {
        actualizarSesion({ run: '1', nombre: 'Nuevo nombre', contrasena: 'secreta' });

        expect(obtenerSesion().nombre).toBe('Nuevo nombre');
        expect(obtenerSesion().contrasena).toBeUndefined();
    });

    it('debería cerrar la sesión', () => {
        iniciarSesion('admin@duoc.cl', 'admin123');
        cerrarSesion();
        expect(obtenerSesion()).toBeNull();
    });

});