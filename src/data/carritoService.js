// ============================================================
//  SERVICIO DEL CARRITO
//  El carrito se guarda como: [ { id: 1, cantidad: 2 }, ... ]
// ============================================================
import { leerDatos, guardarDatos } from './baseDatos';

const CLAVE = 'carrito';

/** Devuelve el carrito guardado, o una lista vacía. */
export function obtenerCarrito() {
    return leerDatos(CLAVE, []);
}

/** Guarda el carrito completo. */
export function guardarCarrito(carrito) {
    guardarDatos(CLAVE, carrito);
}