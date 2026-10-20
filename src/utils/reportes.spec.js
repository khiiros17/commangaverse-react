// ============================================================
//  PRUEBAS: reportes del panel admin
// ============================================================
import { resumenTienda } from './reportes';

describe('Reportes', () => {

    it('debería calcular el resumen de la tienda', () => {
        const productos = [
            { id: 1, stock: 2, stockCritico: 5 },     // crítico
            { id: 2, stock: 20, stockCritico: 5 }
        ];
        const ordenes = [
            { id: 1, total: 10000, estado: 'Pagada' },
            { id: 2, total: 5000, estado: 'Pagada' },
            { id: 3, total: 99999, estado: 'Rechazada' }
        ];
        const usuarios = [{ run: '1' }, { run: '2' }, { run: '3' }];

        const resumen = resumenTienda(productos, ordenes, usuarios);

        expect(resumen.totalProductos).toBe(2);
        expect(resumen.productosCriticos).toBe(1);
        expect(resumen.totalUsuarios).toBe(3);
        expect(resumen.ordenesPagadas).toBe(2);
        expect(resumen.ordenesRechazadas).toBe(1);
        expect(resumen.ventasTotales).toBe(15000);   // las rechazadas NO suman
    });

    it('debería entregar ceros si no hay datos', () => {
        const resumen = resumenTienda([], [], []);
        expect(resumen.ventasTotales).toBe(0);
        expect(resumen.ordenesPagadas).toBe(0);
    });

});