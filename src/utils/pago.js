// pago 

export function limpiarTarjeta(valor) {
    return String(valor).replace(/\s/g, '');
}


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


export function simularPago(numeroTarjeta) {
    return !limpiarTarjeta(numeroTarjeta).endsWith('0000');
}


export function ultimosDigitos(numeroTarjeta) {
    return limpiarTarjeta(numeroTarjeta).slice(-4);
}