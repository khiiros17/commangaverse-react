// ============================================================
//  SERVICIO DE USUARIOS (CRUD)
// ============================================================
import { leerDatos, guardarDatos } from './baseDatos';

const CLAVE = 'usuarios';

// Usuario administrador de ejemplo, para poder entrar al panel
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

// ===== R: LEER =====

/** Devuelve todos los usuarios. */
export function obtenerUsuarios() {
    return leerDatos(CLAVE, usuariosIniciales);
}

/** Busca un usuario por su RUN. Devuelve el usuario o null. */
export function obtenerUsuarioPorRun(run) {
    const usuario = obtenerUsuarios().find(u => u.run === String(run).toUpperCase());
    return usuario || null;
}

/** Busca un usuario por su correo. Devuelve el usuario o null. */
export function obtenerUsuarioPorCorreo(correo) {
    const usuario = obtenerUsuarios().find(
        u => u.correo.toLowerCase() === String(correo).toLowerCase()
    );
    return usuario || null;
}

// ===== C: CREAR =====

/** Crea un usuario. Devuelve el usuario creado, o null si el RUN ya existe. */
export function crearUsuario(datos) {
    const usuarios = obtenerUsuarios();
    const run = String(datos.run).toUpperCase();

    // Regla de negocio: no puede haber dos usuarios con el mismo RUN
    if (usuarios.some(u => u.run === run)) {
        return null;
    }

    const nuevo = { tipo: 'Cliente', ...datos, run: run };
    guardarDatos(CLAVE, [...usuarios, nuevo]);
    return nuevo;
}

// ===== U: ACTUALIZAR =====

/** Actualiza un usuario. El RUN no se puede cambiar. Devuelve el usuario actualizado o null. */
export function actualizarUsuario(run, cambios) {
    const usuarios = obtenerUsuarios();
    const runBuscado = String(run).toUpperCase();

    const actualizados = usuarios.map(u =>
        u.run === runBuscado ? { ...u, ...cambios, run: u.run } : u
    );

    guardarDatos(CLAVE, actualizados);
    return actualizados.find(u => u.run === runBuscado) || null;
}

// ===== D: ELIMINAR =====

/** Elimina un usuario. Devuelve true si lo eliminó. */
export function eliminarUsuario(run) {
    const usuarios = obtenerUsuarios();
    const runBuscado = String(run).toUpperCase();
    const restantes = usuarios.filter(u => u.run !== runBuscado);

    guardarDatos(CLAVE, restantes);
    return restantes.length < usuarios.length;
}