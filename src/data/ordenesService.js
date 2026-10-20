// ============================================================
//  SERVICIO DE ÓRDENES DE COMPRA
//  Guarda las compras en localStorage, con la misma idea
//  que productosService y usuariosService.
// ============================================================
import { leerDatos, guardarDatos } from './baseDatos';
import { actualizarProducto } from './productosService';
import { detalleCarrito, calcularTotal, precioFinal } from '../utils/carrito';
import { simularPago, ultimosDigitos } from '../utils/pago';

const CLAVE = 'ordenes';

/** Todas las órdenes. */
export function obtenerOrdenes() {
    return leerDatos(CLAVE, []);
}

/** Una orden por su número, o null. */
export function obtenerOrdenPorId(id) {
    const orden = obtenerOrdenes().find(o => o.id === Number(id));
    return orden || null;
}

/** Las órdenes de un cliente (por su correo). */
export function obtenerOrdenesDeUsuario(correo) {
    return obtenerOrdenes().filter(
        o => o.cliente.correo.toLowerCase() === String(correo).toLowerCase()
    );
}

/** Guarda una orden nueva con número y fecha automáticos. */
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

/**
 * Procesa una compra completa:
 *  1. Simula el pago.
 *  2. Crea la orden (Pagada o Rechazada).
 *  3. Si se pagó, descuenta el stock de cada producto.
 * Devuelve la orden creada.
 */
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

    // Regla de negocio: el stock SOLO baja si el pago fue aprobado
    if (aprobado) {
        lineas.forEach(({ producto, cantidad }) => {
            actualizarProducto(producto.id, { stock: producto.stock - cantidad });
        });
    }

    return orden;
}