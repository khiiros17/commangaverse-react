
//  pruebas unitarias para el servicio de productos

import {
    obtenerProductos,
    obtenerProductoPorId,
    obtenerCategorias,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} from './productosService';
import { productosIniciales } from './productos';

describe('productosService', () => {


    beforeEach(() => {
        localStorage.clear();
    });

    // leer prueba
    it('debería devolver los productos iniciales si no hay nada guardado', () => {
        expect(obtenerProductos().length).toBe(productosIniciales.length);
    });

    it('debería encontrar un producto por su id', () => {
        const producto = obtenerProductoPorId(1);
        expect(producto.nombre).toBe(productosIniciales[0].nombre);
    });

    it('debería devolver null si el producto no existe', () => {
        expect(obtenerProductoPorId(999)).toBeNull();
    });

    it('debería devolver las categorías sin repetir', () => {
        const categorias = obtenerCategorias();
        const sinRepetir = new Set(categorias);
        expect(categorias.length).toBe(sinRepetir.size);
    });

    // crear prueba
    it('debería crear un producto con un id nuevo', () => {
        const cantidadAntes = obtenerProductos().length;

        const nuevo = crearProducto({ codigo: 'TEST-001', nombre: 'Cómic de prueba', precio: 1000 });

        expect(obtenerProductos().length).toBe(cantidadAntes + 1);
        expect(obtenerProductoPorId(nuevo.id).nombre).toBe('Cómic de prueba');
    });

    // actualizar prueba
    it('debería actualizar el precio de un producto sin cambiar su id', () => {
        const actualizado = actualizarProducto(1, { precio: 5000, id: 999 });

        expect(actualizado.precio).toBe(5000);
        expect(actualizado.id).toBe(1);
    });

    // eliminar prueba
    it('debería eliminar un producto', () => {
        const resultado = eliminarProducto(1);

        expect(resultado).toBeTrue();
        expect(obtenerProductoPorId(1)).toBeNull();
    });

    it('debería devolver false al eliminar un producto que no existe', () => {
        expect(eliminarProducto(999)).toBeFalse();
    });

});