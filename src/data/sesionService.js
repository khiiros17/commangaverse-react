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

/** Guarda en la sesión una copia del usuario SIN la contraseña, y la devuelve. */
export function actualizarSesion(usuario) {
    const sesion = { ...usuario };
    delete sesion.contrasena;

    sessionStorage.setItem(CLAVE, JSON.stringify(sesion));
    return sesion;
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

    return actualizarSesion(usuario);
}

/** Cierra la sesión. */
export function cerrarSesion() {
    sessionStorage.removeItem(CLAVE);
}