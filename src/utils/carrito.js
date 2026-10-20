// ============================================================
//  LÓGICA DEL CARRITO (funciones puras)
//  El carrito es una lista así: [ { id: 1, cantidad: 2 }, ... ]
//  Ninguna función modifica el carrito original: siempre devuelven uno NUEVO.
// ============================================================

/** Precio que se cobra: el de oferta si existe, si no el normal. */
export function precioFinal(producto) {
    if (producto.precioOferta !== null && producto.precioOferta !== undefined) {
        return producto.precioOferta;
    }
    return producto.precio;
}

/**
 * Agrega una unidad de un producto.
 * Regla: no se puede agregar más unidades que el stock disponible.
 */
export function agregarItem(carrito, id, stockDisponible = Infinity) {
    const existente = carrito.find(item => item.id === id);
    const cantidadActual = existente ? existente.cantidad : 0;

    // Regla de negocio: no superar el stock
    if (cantidadActual >= stockDisponible) {
        return carrito;
    }

    if (existente) {
        return carrito.map(item =>
            item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
    }
    return [...carrito, { id: id, cantidad: 1 }];
}

/**
 * Suma o resta unidades (cambio = +1 o -1).
 * Regla: si la cantidad llega a 0, el producto se quita del carrito.
 */
export function cambiarCantidad(carrito, id, cambio, stockDisponible = Infinity) {
    return carrito
        .map(item => {
            if (item.id !== id) return item;
            const nuevaCantidad = Math.min(item.cantidad + cambio, stockDisponible);
            return { ...item, cantidad: nuevaCantidad };
        })
        .filter(item => item.cantidad > 0);
}

/** Quita un producto completo del carrito. */
export function quitarItem(carrito, id) {
    return carrito.filter(item => item.id !== id);
}

/** Cuenta cuántas unidades hay en total (para el número del Header). */
export function contarUnidades(carrito) {
    return carrito.reduce((suma, item) => suma + item.cantidad, 0);
}

/**
 * Une el carrito con los datos de los productos.
 * Devuelve: [ { producto, cantidad, subtotal }, ... ]
 * Si un producto ya no existe (el admin lo borró), se ignora.
 */
export function detalleCarrito(carrito, productos) {
    return carrito
        .map(item => {
            const producto = productos.find(p => p.id === item.id);
            if (!producto) return null;
            return {
                producto: producto,
                cantidad: item.cantidad,
                subtotal: precioFinal(producto) * item.cantidad
            };
        })
        .filter(linea => linea !== null);
}

/** Calcula el total a pagar. */
export function calcularTotal(carrito, productos) {
    return detalleCarrito(carrito, productos).reduce((suma, linea) => suma + linea.subtotal, 0);
}