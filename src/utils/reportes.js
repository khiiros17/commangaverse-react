// ============================================================
//  REPORTES (funciones puras)
//  Calculan los números del panel de administrador.
// ============================================================
import { esCritico } from './validacionesProducto';

/** Solo las órdenes que se cobraron. */
function soloPagadas(ordenes) {
    return ordenes.filter(o => o.estado === 'Pagada');
}

/** Resumen general de la tienda para el dashboard. */
export function resumenTienda(productos, ordenes, usuarios) {
    const pagadas = soloPagadas(ordenes);

    return {
        totalProductos: productos.length,
        productosCriticos: productos.filter(esCritico).length,
        totalUsuarios: usuarios.length,
        ordenesPagadas: pagadas.length,
        ordenesRechazadas: ordenes.length - pagadas.length,
        ventasTotales: pagadas.reduce((suma, o) => suma + o.total, 0)
    };
}

/** Los productos con más unidades vendidas (de mayor a menor). */
export function productosMasVendidos(ordenes, limite = 5) {
    const conteo = {};

    soloPagadas(ordenes).forEach(orden => {
        orden.items.forEach(item => {
            if (!conteo[item.id]) {
                conteo[item.id] = { id: item.id, nombre: item.nombre, cantidad: 0, total: 0 };
            }
            conteo[item.id].cantidad += item.cantidad;
            conteo[item.id].total += item.subtotal;
        });
    });

    return Object.values(conteo)
        .sort((a, b) => b.cantidad - a.cantidad)
        .slice(0, limite);
}

/** Cuánto se vendió en cada categoría (de mayor a menor). */
export function ventasPorCategoria(ordenes, productos) {
    const totales = {};

    soloPagadas(ordenes).forEach(orden => {
        orden.items.forEach(item => {
            const producto = productos.find(p => p.id === item.id);
            const categoria = producto ? producto.categoria : 'Sin categoría';
            totales[categoria] = (totales[categoria] || 0) + item.subtotal;
        });
    });

    return Object.entries(totales)
        .map(([categoria, total]) => ({ categoria, total }))
        .sort((a, b) => b.total - a.total);
}