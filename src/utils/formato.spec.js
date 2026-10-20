// ============================================================
//  PRUEBAS: formatearPrecio
// ============================================================
import { formatearPrecio } from './formato';

describe('formatearPrecio', () => {

    it('debería agregar el signo $ y el punto de miles', () => {
        expect(formatearPrecio(12990)).toBe('$12.990');
    });

    it('debería mostrar $0 para un producto gratis', () => {
        expect(formatearPrecio(0)).toBe('$0');
    });

    it('debería aceptar un precio escrito como texto', () => {
        expect(formatearPrecio('8490')).toBe('$8.490');
    });

});