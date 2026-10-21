//pruebas unitarias de reportes
import { resumenTienda, productosMasVendidos, ventasPorCategoria } from './reportes';


const ordenes = [
    {
        id: 1, total: 10000, estado: 'Pagada', items: [
            { id: 1, nombre: 'Spider-Man #1', cantidad: 1, subtotal: 6000 },
            { id: 2, nombre: 'Naruto Vol. 1', cantidad: 2, subtotal: 4000 }
        ]
    },
    {
        id: 2, total: 5000, estado: 'Pagada', items: [
            { id: 2, nombre: 'Naruto Vol. 1', cantidad: 1, subtotal: 2000 },
            { id: 9, nombre: 'Producto borrado', cantidad: 1, subtotal: 3000 }
        ]
    },
    {
        id: 3, total: 99999, estado: 'Rechazada', items: [
            { id: 1, nombre: 'Spider-Man #1', cantidad: 50, subtotal: 99999 }
        ]
    }
];

const productos = [
    { id: 1, categoria: 'Superhéroes', stock: 2, stockCritico: 5 },
    { id: 2, categoria: 'Manga', stock: 20, stockCritico: 5 }
];

describe('Reportes', () => {

    it('debería calcular el resumen de la tienda', () => {
        const usuarios = [{ run: '1' }, { run: '2' }, { run: '3' }];

        const resumen = resumenTienda(productos, ordenes, usuarios);

        expect(resumen.totalProductos).toBe(2);
        expect(resumen.productosCriticos).toBe(1);
        expect(resumen.totalUsuarios).toBe(3);
        expect(resumen.ordenesPagadas).toBe(2);
        expect(resumen.ordenesRechazadas).toBe(1);
        expect(resumen.ventasTotales).toBe(15000);
    });

    it('debería entregar ceros si no hay datos', () => {
        const resumen = resumenTienda([], [], []);
        expect(resumen.ventasTotales).toBe(0);
        expect(resumen.ordenesPagadas).toBe(0);
    });

    it('debería ordenar los más vendidos sumando las unidades de todas las órdenes pagadas', () => {
        const ranking = productosMasVendidos(ordenes);

        expect(ranking[0].nombre).toBe('Naruto Vol. 1');
        expect(ranking[0].cantidad).toBe(3);
        expect(ranking[0].total).toBe(6000);
        expect(ranking.length).toBe(3);
    });

    it('debería respetar el límite del ranking', () => {
        expect(productosMasVendidos(ordenes, 1).length).toBe(1);
    });

    it('debería sumar las ventas por categoría, de mayor a menor', () => {
        const resultado = ventasPorCategoria(ordenes, productos);

        expect(resultado).toEqual([
            { categoria: 'Superhéroes', total: 6000 },
            { categoria: 'Manga', total: 6000 },
            { categoria: 'Sin categoría', total: 3000 }
        ]);
    });

});