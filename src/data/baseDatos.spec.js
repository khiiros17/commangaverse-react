// ============================================================
//  PRUEBAS: base de datos simulada (con MOCKS de localStorage)
// ============================================================
import { leerDatos, guardarDatos } from './baseDatos';

describe('baseDatos', () => {

    beforeEach(() => {
        localStorage.clear();
    });

    it('debería guardar los datos como texto JSON en localStorage', () => {
        // MOCK: un "espía" que vigila la función real setItem de localStorage
        spyOn(Storage.prototype, 'setItem');

        guardarDatos('prueba', [1, 2, 3]);

        expect(localStorage.setItem).toHaveBeenCalledWith('prueba', '[1,2,3]');
    });

    it('debería devolver el valor inicial si no hay nada guardado', () => {
        expect(leerDatos('noExiste', ['inicial'])).toEqual(['inicial']);
    });

    it('debería devolver el valor inicial si los datos guardados están dañados', () => {
        // MOCK: simulamos que localStorage devuelve un texto que NO es JSON válido
        spyOn(Storage.prototype, 'getItem').and.returnValue('esto no es JSON {');

        expect(leerDatos('carrito', [])).toEqual([]);
    });

});