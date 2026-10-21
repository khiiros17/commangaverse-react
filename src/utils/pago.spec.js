//pruebas unitarias para la logica del pago
import { validarTarjeta, simularPago, ultimosDigitos } from './pago';

describe('Pago simulado', () => {

    it('debería exigir el número de tarjeta', () => {
        expect(validarTarjeta('')).toBe('El número de tarjeta es obligatorio.');
    });

    it('debería rechazar tarjetas que no tienen 16 números', () => {
        expect(validarTarjeta('1234')).toBe('La tarjeta debe tener 16 números.');
        expect(validarTarjeta('4111abcd11111111')).toBe('La tarjeta debe tener 16 números.');
    });

    it('debería aceptar 16 números, aunque tengan espacios', () => {
        expect(validarTarjeta('4111 1111 1111 1111')).toBe('');
    });

    it('debería aprobar el pago, salvo si la tarjeta termina en 0000', () => {
        expect(simularPago('4111111111111111')).toBeTrue();
        expect(simularPago('4111111111110000')).toBeFalse();
    });

    it('debería guardar solo los 4 últimos números', () => {
        expect(ultimosDigitos('4111 1111 1111 1234')).toBe('1234');
    });

});