// pruebas unitarias para la logia del carrito.
import {
    precioFinal,
    agregarItem,
    cambiarCantidad,
    quitarItem,
    contarUnidades,
    calcularTotal
} from './carrito';

const comicNormal = { id: 1, nombre: 'Cómic normal', precio: 10000, precioOferta: null, stock: 5 };
const comicOferta = { id: 2, nombre: 'Cómic en oferta', precio: 8000, precioOferta: 6000, stock: 2 };
const productos = [comicNormal, comicOferta];

describe('Lógica del carrito', () => {

    describe('precioFinal', () => {
        it('debería usar el precio normal si no hay oferta', () => {
            expect(precioFinal(comicNormal)).toBe(10000);
        });

        it('debería usar el precio de oferta si existe', () => {
            expect(precioFinal(comicOferta)).toBe(6000);
        });
    });

    describe('agregarItem', () => {
        it('debería agregar un producto nuevo con cantidad 1', () => {
            const carrito = agregarItem([], 1);
            expect(carrito).toEqual([{ id: 1, cantidad: 1 }]);
        });

        it('debería sumar 1 si el producto ya estaba (sin duplicarlo)', () => {
            const carrito = agregarItem([{ id: 1, cantidad: 1 }], 1);
            expect(carrito).toEqual([{ id: 1, cantidad: 2 }]);
        });

        it('NO debería superar el stock disponible', () => {
            const carrito = agregarItem([{ id: 2, cantidad: 2 }], 2, comicOferta.stock);
            expect(carrito).toEqual([{ id: 2, cantidad: 2 }]);
        });

        it('NO debería modificar el carrito original (inmutabilidad)', () => {
            const original = [{ id: 1, cantidad: 1 }];
            agregarItem(original, 1);
            expect(original).toEqual([{ id: 1, cantidad: 1 }]);
        });
    });

    describe('cambiarCantidad y quitarItem', () => {
        it('debería restar una unidad', () => {
            const carrito = cambiarCantidad([{ id: 1, cantidad: 3 }], 1, -1);
            expect(carrito).toEqual([{ id: 1, cantidad: 2 }]);
        });

        it('debería quitar el producto si la cantidad llega a 0', () => {
            const carrito = cambiarCantidad([{ id: 1, cantidad: 1 }], 1, -1);
            expect(carrito).toEqual([]);
        });

        it('debería quitar un producto completo', () => {
            const carrito = quitarItem([{ id: 1, cantidad: 3 }, { id: 2, cantidad: 1 }], 1);
            expect(carrito).toEqual([{ id: 2, cantidad: 1 }]);
        });
    });

    describe('contarUnidades y calcularTotal', () => {
        const carrito = [{ id: 1, cantidad: 2 }, { id: 2, cantidad: 1 }];

        it('debería contar todas las unidades', () => {
            expect(contarUnidades(carrito)).toBe(3);
        });

        it('debería calcular el total usando el precio de oferta', () => {
            // 2 x 10.000 + 1 x 6.000 = 26.000
            expect(calcularTotal(carrito, productos)).toBe(26000);
        });

        it('debería ignorar productos que ya no existen', () => {
            expect(calcularTotal([{ id: 99, cantidad: 5 }], productos)).toBe(0);
        });
    });

});