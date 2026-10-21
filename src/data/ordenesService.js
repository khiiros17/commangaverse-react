// 
//  ordenes de compra (CRUD)

import { leerDatos, guardarDatos } from './baseDatos';
import { actualizarProducto } from './productosService';
import { detalleCarrito, calcularTotal, precioFinal } from '../utils/carrito';
import { simularPago, ultimosDigitos } from '../utils/pago';

const CLAVE = 'ordenes';

/** devuelve las ordenes */
export function obtenerOrdenes() {
    return leerDatos(CLAVE, []);
}

/** orden por numero  */
export function obtenerOrdenPorId(id) {
    const orden = obtenerOrdenes().find(o => o.id === Number(id));
    return orden || null;
}

/** las ordenes del usuario por correo */
export function obtenerOrdenesDeUsuario(correo) {
    return obtenerOrdenes().filter(
        o => o.cliente.correo.toLowerCase() === String(correo).toLowerCase()
    );
}

/** Guarda la orden con un id y fecha de forma automatica */
export function crearOrden(datos) {
    const ordenes = obtenerOrdenes();
    const idMayor = ordenes.reduce((max, o) => Math.max(max, o.id), 0);

    const nueva = {
        ...datos,
        id: idMayor + 1,
        fecha: new Date().toISOString()
    };

    guardarDatos(CLAVE, [...ordenes, nueva]);
    return nueva;
}

// procesa la compra devuelve la orden y actualiza el stock si se paga 
export function procesarCompra(carrito, productos, cliente, tarjeta) {
    const lineas = detalleCarrito(carrito, productos);
    const aprobado = simularPago(tarjeta);

    const orden = crearOrden({
        cliente: cliente,
        items: lineas.map(({ producto, cantidad, subtotal }) => ({
            id: producto.id,
            nombre: producto.nombre,
            precio: precioFinal(producto),
            cantidad: cantidad,
            subtotal: subtotal
        })),
        total: calcularTotal(carrito, productos),
        tarjeta: ultimosDigitos(tarjeta),
        estado: aprobado ? 'Pagada' : 'Rechazada'
    });

    // regla de negocio el stock solo baja si el pago fue aprobado
    if (aprobado) {
        lineas.forEach(({ producto, cantidad }) => {
            actualizarProducto(producto.id, { stock: producto.stock - cantidad });
        });
    }

    return orden;
}