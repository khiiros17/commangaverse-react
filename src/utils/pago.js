// ============================================================
//  PAGO SIMULADO
//  ⚠️ No es un pago real: solo imita cómo respondería un banco.
//  Regla para probar: una tarjeta que TERMINA en 0000 es RECHAZADA.
// ============================================================

/** Quita los espacios: "4111 1111 1111 1111" → "4111111111111111" */
export function limpiarTarjeta(valor) {
    return String(valor).replace(/\s/g, '');
}

/** Tarjeta: obligatoria y de 16 números. Devuelve el error o "". */
export function validarTarjeta(valor) {
    const numero = limpiarTarjeta(valor);

    if (numero === '') {
        return 'El número de tarjeta es obligatorio.';
    }
    if (!/^\d{16}$/.test(numero)) {
        return 'La tarjeta debe tener 16 números.';
    }
    return '';
}

/** Simula la respuesta del banco: true = aprobado, false = rechazado. */
export function simularPago(numeroTarjeta) {
    return !limpiarTarjeta(numeroTarjeta).endsWith('0000');
}

/** Solo los 4 últimos números (nunca se guarda la tarjeta completa). */
export function ultimosDigitos(numeroTarjeta) {
    return limpiarTarjeta(numeroTarjeta).slice(-4);
}