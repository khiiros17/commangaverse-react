
//  pruebas unitarias para la base de datos simulada

import { leerDatos, guardarDatos } from './baseDatos';


//  pruebas unitarias para la base de datos simulada
describe('baseDatos', () => {

    beforeEach(() => {
        localStorage.clear();
    });

    it('debería guardar los datos como texto JSON en localStorage', () => {
        // simulacion del metodo setItem de localStorage para poder espiar si se llama correctamente
        spyOn(Storage.prototype, 'setItem');

        guardarDatos('prueba', [1, 2, 3]);

        expect(localStorage.setItem).toHaveBeenCalledWith('prueba', '[1,2,3]');
    });

    it('debería devolver el valor inicial si no hay nada guardado', () => {
        expect(leerDatos('noExiste', ['inicial'])).toEqual(['inicial']);
    });

    it('debería devolver el valor inicial si los datos guardados están dañados', () => {
        // mocks simulamos que localStorage devuelve un texto que no es JSON valido
        spyOn(Storage.prototype, 'getItem').and.returnValue('esto no es JSON {');

        expect(leerDatos('carrito', [])).toEqual([]);
    });

});