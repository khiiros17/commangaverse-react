// logica de negocio del carrito de compras


export function precioFinal(producto) {
    if (producto.precioOferta !== null && producto.precioOferta !== undefined) {
        return producto.precioOferta;
    }
    return producto.precio;
}


export function agregarItem(carrito, id, stockDisponible = Infinity) {
    const existente = carrito.find(item => item.id === id);
    const cantidadActual = existente ? existente.cantidad : 0;


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


export function cambiarCantidad(carrito, id, cambio, stockDisponible = Infinity) {
    return carrito
        .map(item => {
            if (item.id !== id) return item;
            const nuevaCantidad = Math.min(item.cantidad + cambio, stockDisponible);
            return { ...item, cantidad: nuevaCantidad };
        })
        .filter(item => item.cantidad > 0);
}


export function quitarItem(carrito, id) {
    return carrito.filter(item => item.id !== id);
}


export function contarUnidades(carrito) {
    return carrito.reduce((suma, item) => suma + item.cantidad, 0);
}


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


export function calcularTotal(carrito, productos) {
    return detalleCarrito(carrito, productos).reduce((suma, linea) => suma + linea.subtotal, 0);
}