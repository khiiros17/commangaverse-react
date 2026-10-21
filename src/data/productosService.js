
//  servicio de producto(CRUD)
import { productosIniciales } from './productos';
import { leerDatos, guardarDatos } from './baseDatos';

const CLAVE = 'productos';

// leer

/** devuelve todos los productos */
export function obtenerProductos() {
    return leerDatos(CLAVE, productosIniciales);
}

/** devuelve un producto por su id o null si no existe. */
export function obtenerProductoPorId(id) {
    const producto = obtenerProductos().find(p => p.id === Number(id));
    return producto || null;
}

/** devuelve la lista de categorias sin repetir. */
export function obtenerCategorias() {
    const categorias = obtenerProductos().map(p => p.categoria);
    return [...new Set(categorias)];
}

/** devuelve solo los productos que tienen precio de oferta. */
export function obtenerOfertas() {
    return obtenerProductos().filter(p => p.precioOferta !== null && p.precioOferta !== undefined);
}

// crear

/** crea un producto nuevo con un id que no se repite devuelve el producto creado */
export function crearProducto(datos) {
    const productos = obtenerProductos();

    // busca el id mas alto y le suma 1 
    const idMayor = productos.reduce((max, p) => Math.max(max, p.id), 0);
    const nuevo = { ...datos, id: idMayor + 1 };

    guardarDatos(CLAVE, [...productos, nuevo]);
    return nuevo;
}

// actualizar

/** actualiza un producto devuelve el producto actualizado o null si no existe */
export function actualizarProducto(id, cambios) {
    const productos = obtenerProductos();

    const actualizados = productos.map(p =>
        p.id === Number(id) ? { ...p, ...cambios, id: p.id } : p
    );

    guardarDatos(CLAVE, actualizados);
    return actualizados.find(p => p.id === Number(id)) || null;
}

// eliminar

/** elimina un producto devuelve true si fue eliminado y false si nunca existio */
export function eliminarProducto(id) {
    const productos = obtenerProductos();
    const restantes = productos.filter(p => p.id !== Number(id));

    guardarDatos(CLAVE, restantes);
    return restantes.length < productos.length;
}

// para restablecer los productos a los iniciales, esto es para pruebas. uwu


export function restablecerProductos() {
    guardarDatos(CLAVE, productosIniciales);
    return productosIniciales;
}