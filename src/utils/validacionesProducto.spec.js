// ============================================================
//  PRUEBAS: validaciones de productos (panel admin)
// ============================================================
import {
    validarCodigo, validarPrecio, validarPrecioOferta, validarStock,
    validarProducto, codigoRepetido, esCritico
} from './validacionesProducto';

describe('Validaciones de productos', () => {

    it('debería exigir un código de al menos 3 caracteres', () => {
        expect(validarCodigo('')).toBe('El código es obligatorio.');
        expect(validarCodigo('AB')).toBe('El código debe tener al menos 3 caracteres.');
        expect(validarCodigo('MAN-003')).toBe('');
    });

    it('debería aceptar solo precios que sean números mayores o iguales a 0', () => {
        expect(validarPrecio('')).toBe('El precio es obligatorio.');
        expect(validarPrecio('-5')).toBe('El precio debe ser un número mayor o igual a 0.');
        expect(validarPrecio('9990')).toBe('');
    });

    it('debería exigir que la oferta sea menor que el precio normal', () => {
        expect(validarPrecioOferta('', 9990)).toBe('');                 // opcional
        expect(validarPrecioOferta('9990', 9990)).toBe('La oferta debe ser menor que el precio normal.');
        expect(validarPrecioOferta('7990', 9990)).toBe('');
    });

    it('debería aceptar solo stock entero y no negativo', () => {
        expect(validarStock('')).toBe('El stock es obligatorio.');
        expect(validarStock('', false)).toBe('');                      // stock crítico es opcional
        expect(validarStock('2.5')).toBe('Debe ser un número entero mayor o igual a 0.');
        expect(validarStock('-1')).toBe('Debe ser un número entero mayor o igual a 0.');
        expect(validarStock('10')).toBe('');
    });

    it('debería validar todos los campos de una vez', () => {
        const errores = validarProducto({
            codigo: '', nombre: 'Akira', descripcion: '', precio: '9990', precioOferta: '',
            stock: '5', stockCritico: '', categoria: 'Manga', imagen: ''
        });

        expect(errores.codigo).toBe('El código es obligatorio.');
        expect(errores.nombre).toBe('');
        expect(errores.precio).toBe('');
    });

    it('debería detectar códigos repetidos, sin contar al mismo producto', () => {
        const productos = [{ id: 1, codigo: 'MAN-001' }, { id: 2, codigo: 'COM-001' }];

        expect(codigoRepetido(productos, 'man-001')).toBeTrue();       // ignora mayúsculas
        expect(codigoRepetido(productos, 'MAN-001', 1)).toBeFalse();   // es el mismo producto (editando)
        expect(codigoRepetido(productos, 'MAN-999')).toBeFalse();
    });

    it('debería marcar como crítico el stock menor o igual al stock crítico', () => {
        expect(esCritico({ stock: 3, stockCritico: 5 })).toBeTrue();
        expect(esCritico({ stock: 5, stockCritico: 5 })).toBeTrue();
        expect(esCritico({ stock: 9, stockCritico: 5 })).toBeFalse();
        expect(esCritico({ stock: 0, stockCritico: null })).toBeFalse();   // sin stock crítico definido
    });

});