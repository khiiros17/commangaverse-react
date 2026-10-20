// ============================================================
//  PRUEBAS: servicio de órdenes (crear y procesar compras)
// ============================================================
import {
    obtenerOrdenes,
    obtenerOrdenPorId,
    obtenerOrdenesDeUsuario,
    crearOrden,
    procesarCompra
} from './ordenesService';
import { obtenerProductos, obtenerProductoPorId } from './productosService';

const cliente = { nombre: 'Ana', apellidos: 'Pérez', correo: 'ana@duoc.cl' };

describe('ordenesService', () => {

    beforeEach(() => {
        localStorage.clear();     // sin órdenes y con los productos iniciales
    });

    it('debería partir sin órdenes', () => {
        expect(obtenerOrdenes()).toEqual([]);
    });

    it('debería crear órdenes con número correlativo y fecha', () => {
        const primera = crearOrden({ cliente, items: [], total: 0, estado: 'Pagada' });
        const segunda = crearOrden({ cliente, items: [], total: 0, estado: 'Pagada' });

        expect(primera.id).toBe(1);
        expect(segunda.id).toBe(2);
        expect(primera.fecha).toBeDefined();
        expect(obtenerOrdenPorId(2).id).toBe(2);
    });

    it('debería buscar las órdenes de un cliente por su correo', () => {
        crearOrden({ cliente, items: [], total: 0, estado: 'Pagada' });
        crearOrden({ cliente: { ...cliente, correo: 'otro@gmail.com' }, items: [], total: 0, estado: 'Pagada' });

        expect(obtenerOrdenesDeUsuario('ANA@duoc.cl').length).toBe(1);
    });

    // REGLA DE NEGOCIO: pago aprobado → orden pagada y baja el stock
    it('debería crear una orden Pagada y descontar el stock si el pago se aprueba', () => {
        const productos = obtenerProductos();
        const stockAntes = obtenerProductoPorId(1).stock;
        const carrito = [{ id: 1, cantidad: 2 }];

        const orden = procesarCompra(carrito, productos, cliente, '4111111111111111');

        expect(orden.estado).toBe('Pagada');
        expect(orden.tarjeta).toBe('1111');
        expect(orden.items[0].cantidad).toBe(2);
        expect(obtenerProductoPorId(1).stock).toBe(stockAntes - 2);
    });

    // REGLA DE NEGOCIO: pago rechazado → el stock NO cambia
    it('debería crear una orden Rechazada sin tocar el stock si el pago falla', () => {
        const productos = obtenerProductos();
        const stockAntes = obtenerProductoPorId(1).stock;

        const orden = procesarCompra([{ id: 1, cantidad: 2 }], productos, cliente, '4111111111110000');

        expect(orden.estado).toBe('Rechazada');
        expect(obtenerProductoPorId(1).stock).toBe(stockAntes);
    });

});