
//  SERVICIO DEL CARRITO


import { leerDatos, guardarDatos } from './baseDatos';

const CLAVE = 'carrito';

// para mostrar el carrito en la pagina, y se exporta la funcion y asi poder usar en otros arcivos.
export function obtenerCarrito() {
    return leerDatos(CLAVE, []);
}

// para  guardar el carrito en la pagina, y tambien exportar para que se pueda usar en otros archivos.
export function guardarCarrito(carrito) {
    guardarDatos(CLAVE, carrito);
}