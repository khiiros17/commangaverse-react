// ============================================================
//  REPORTES (funciones puras)
//  Calculan los números del panel de administrador.
// ============================================================
import { esCritico } from './validacionesProducto';

/** Resumen general de la tienda para el dashboard. */
export function resumenTienda(productos, ordenes, usuarios) {
    const pagadas = ordenes.filter(o => o.estado === 'Pagada');

    return {
        totalProductos: productos.length,
        productosCriticos: productos.filter(esCritico).length,
        totalUsuarios: usuarios.length,
        ordenesPagadas: pagadas.length,
        ordenesRechazadas: ordenes.length - pagadas.length,
        ventasTotales: pagadas.reduce((suma, o) => suma + o.total, 0)
    };
}