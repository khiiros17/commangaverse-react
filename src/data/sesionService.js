// ============================================================
//  SERVICIO DE SESIÓN
//  Usa sessionStorage: la sesión se borra al cerrar la pestaña.
// ============================================================
import { obtenerUsuarioPorCorreo } from './usuariosService';

const CLAVE = 'sesion';

/** Devuelve el usuario que inició sesión, o null. */
export function obtenerSesion() {
    const guardado = sessionStorage.getItem(CLAVE);
    if (guardado === null) {
        return null;
    }
    try {
        return JSON.parse(guardado);
    } catch {
        return null;
    }
}

/**
 * Revisa el correo y la contraseña.
 * Si son correctos, guarda la sesión y devuelve el usuario (SIN la contraseña).
 * Si no, devuelve null.
 */
export function iniciarSesion(correo, contrasena) {
    const usuario = obtenerUsuarioPorCorreo(correo);

    if (!usuario || usuario.contrasena !== contrasena) {
        return null;
    }

    // Nunca se guarda la contraseña en la sesión
    const sesion = { ...usuario };
    delete sesion.contrasena;

    sessionStorage.setItem(CLAVE, JSON.stringify(sesion));
    return sesion;
}

/** Cierra la sesión. */
export function cerrarSesion() {
    sessionStorage.removeItem(CLAVE);
}