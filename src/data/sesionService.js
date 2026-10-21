
//  servicio de sesion para guardar la sesion del usuario en el sesionstorage del navegador

import { obtenerUsuarioPorCorreo } from './usuariosService';

const CLAVE = 'sesion';

/** devuelve la sesion del usuario o null */
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

/** guarda la sesion del usuario o null */
export function actualizarSesion(usuario) {
    const sesion = { ...usuario };
    delete sesion.contrasena;

    sessionStorage.setItem(CLAVE, JSON.stringify(sesion));
    return sesion;
}

// inicua la sesion del usuario si el correo y la contraseña son correctas.
export function iniciarSesion(correo, contrasena) {
    const usuario = obtenerUsuarioPorCorreo(correo);

    if (!usuario || usuario.contrasena !== contrasena) {
        return null;
    }

    return actualizarSesion(usuario);
}

// cierra la sesion del usuario
export function cerrarSesion() {
    sessionStorage.removeItem(CLAVE);
}