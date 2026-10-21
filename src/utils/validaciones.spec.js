// pruebas unitarias de las validaciones
import {
    validarCorreo,
    validarContrasena,
    validarTexto,
    validarRun,
    validarFecha,
    hayErrores
} from './validaciones';

describe('Validaciones', () => {

    describe('validarCorreo', () => {
        it('debería aceptar los tres dominios permitidos', () => {
            expect(validarCorreo('ana@duoc.cl')).toBe('');
            expect(validarCorreo('profe@profesor.duoc.cl')).toBe('');
            expect(validarCorreo('ana@gmail.com')).toBe('');
        });

        it('debería rechazar un dominio no permitido', () => {
            expect(validarCorreo('ana@hotmail.com')).toContain('Solo se aceptan');
        });

        it('debería exigir el correo si es obligatorio', () => {
            expect(validarCorreo('')).toBe('El correo es obligatorio.');
        });

        it('debería aceptar un correo vacío si es opcional', () => {
            expect(validarCorreo('', false)).toBe('');
        });
    });

    describe('validarContrasena', () => {
        it('debería rechazar menos de 4 caracteres', () => {
            expect(validarContrasena('abc')).not.toBe('');
        });

        it('debería aceptar entre 4 y 10 caracteres', () => {
            expect(validarContrasena('1234')).toBe('');
            expect(validarContrasena('1234567890')).toBe('');
        });

        it('debería rechazar más de 10 caracteres', () => {
            expect(validarContrasena('12345678901')).not.toBe('');
        });
    });

    describe('validarTexto', () => {
        it('debería rechazar un texto más largo que el máximo', () => {
            expect(validarTexto('a'.repeat(51), 'Nombre', 50)).toContain('no puede tener más de 50');
        });
    });

    describe('validarRun (módulo 11)', () => {
        it('debería aceptar RUN válidos', () => {
            expect(validarRun('123456785')).toBe('');
            expect(validarRun('1000005K')).toBe('');
            expect(validarRun('1000005k')).toBe('');
        });

        it('debería rechazar un dígito verificador incorrecto', () => {
            expect(validarRun('123456789')).toContain('dígito verificador');
        });

        it('debería rechazar un RUN con puntos o guion', () => {
            expect(validarRun('12.345.678-5')).toContain('sin puntos ni guion');
        });
    });

    describe('validarFecha y hayErrores', () => {
        it('debería rechazar una fecha futura', () => {
            expect(validarFecha('2999-01-01')).not.toBe('');
        });

        it('debería detectar si hay algún error', () => {
            expect(hayErrores({ correo: '', nombre: 'Falta el nombre' })).toBeTrue();
            expect(hayErrores({ correo: '', nombre: '' })).toBeFalse();
        });
    });

});