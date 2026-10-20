// ============================================================
//  SERVICIO DE PRODUCTOS (CRUD)
// ============================================================
import { productosIniciales } from './productos';
import { leerDatos, guardarDatos } from './baseDatos';

const CLAVE = 'productos';

// ===== R: LEER =====

/** Devuelve todos los productos. */
export function obtenerProductos() {
    return leerDatos(CLAVE, productosIniciales);
}

/** Devuelve un producto por su id, o null si no existe. */
export function obtenerProductoPorId(id) {
    const producto = obtenerProductos().find(p => p.id === Number(id));
    return producto || null;
}

/** Devuelve la lista de categorías, sin repetir. */
export function obtenerCategorias() {
    const categorias = obtenerProductos().map(p => p.categoria);
    return [...new Set(categorias)];
}

/** Devuelve solo los productos que tienen precio de oferta. */
export function obtenerOfertas() {
    return obtenerProductos().filter(p => p.precioOferta !== null && p.precioOferta !== undefined);
}

// ===== C: CREAR =====

/** Crea un producto nuevo con un id que no se repite. Devuelve el producto creado. */
export function crearProducto(datos) {
    const productos = obtenerProductos();

    // Busca el id más alto y le suma 1 (igual que en la Evaluación 1)
    const idMayor = productos.reduce((max, p) => Math.max(max, p.id), 0);
    const nuevo = { ...datos, id: idMayor + 1 };

    guardarDatos(CLAVE, [...productos, nuevo]);
    return nuevo;
}

// ===== U: ACTUALIZAR =====

/** Actualiza un producto. Devuelve el producto actualizado, o null si no existe. */
export function actualizarProducto(id, cambios) {
    const productos = obtenerProductos();

    const actualizados = productos.map(p =>
        p.id === Number(id) ? { ...p, ...cambios, id: p.id } : p
    );

    guardarDatos(CLAVE, actualizados);
    return actualizados.find(p => p.id === Number(id)) || null;
}

// ===== D: ELIMINAR =====

/** Elimina un producto. Devuelve true si lo eliminó, false si no existía. */
export function eliminarProducto(id) {
    const productos = obtenerProductos();
    const restantes = productos.filter(p => p.id !== Number(id));

    guardarDatos(CLAVE, restantes);
    return restantes.length < productos.length;
}

// ===== EXTRA =====

/** Vuelve a la lista original de productos. */
export function restablecerProductos() {
    guardarDatos(CLAVE, productosIniciales);
    return productosIniciales;
}