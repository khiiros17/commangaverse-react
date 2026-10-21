
//   usuario (CRUD)

import { leerDatos, guardarDatos } from './baseDatos';

const CLAVE = 'usuarios';

// usuario administrador, para poder entrar al panel
export const usuariosIniciales = [
    {
        run: '111111111',
        nombre: 'Admin',
        apellidos: 'ComMangaVerse',
        correo: 'admin@duoc.cl',
        contrasena: 'admin123',
        fechaNacimiento: '',
        tipo: 'Administrador',
        region: 'Región Metropolitana',
        comuna: 'Santiago',
        direccion: 'Av. Siempre Viva 123'
    }
];

//  leer

/** devuelve todos los usuarios */
export function obtenerUsuarios() {
    return leerDatos(CLAVE, usuariosIniciales);
}

/** busca un usuario por su rut deevuelve el usuario o null */
export function obtenerUsuarioPorRun(run) {
    const usuario = obtenerUsuarios().find(u => u.run === String(run).toUpperCase());
    return usuario || null;
}

/** busca un usuario por su correo devuelve el usuario o null */
export function obtenerUsuarioPorCorreo(correo) {
    const usuario = obtenerUsuarios().find(
        u => u.correo.toLowerCase() === String(correo).toLowerCase()
    );
    return usuario || null;
}

// crear

/** crea un usuario devuelve el usuario creado o null si el rut ya existe */
export function crearUsuario(datos) {
    const usuarios = obtenerUsuarios();
    const run = String(datos.run).toUpperCase();

    // regla de negocio no puede haber dos usuarios con el mismo rut
    if (usuarios.some(u => u.run === run)) {
        return null;
    }

    const nuevo = { tipo: 'Cliente', ...datos, run: run };
    guardarDatos(CLAVE, [...usuarios, nuevo]);
    return nuevo;
}

// actualizar

/** actualiza un usuario el rut no se puede cambiar devuelve el usuario actualizado o null */
export function actualizarUsuario(run, cambios) {
    const usuarios = obtenerUsuarios();
    const runBuscado = String(run).toUpperCase();

    const actualizados = usuarios.map(u =>
        u.run === runBuscado ? { ...u, ...cambios, run: u.run } : u
    );

    guardarDatos(CLAVE, actualizados);
    return actualizados.find(u => u.run === runBuscado) || null;
}

// eliminar

/** elimina un usuario devuelve true cuando lo elimine */
export function eliminarUsuario(run) {
    const usuarios = obtenerUsuarios();
    const runBuscado = String(run).toUpperCase();
    const restantes = usuarios.filter(u => u.run !== runBuscado);

    guardarDatos(CLAVE, restantes);
    return restantes.length < usuarios.length;
}