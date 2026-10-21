// validaciones

export const DOMINIOS_PERMITIDOS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];


export function validarCorreo(valor, obligatorio = true) {
    if (valor === '') {
        return obligatorio ? 'El correo es obligatorio.' : '';
    }
    if (valor.length > 100) {
        return 'El correo no puede tener más de 100 caracteres.';
    }
    const partes = valor.toLowerCase().split('@');
    if (partes.length !== 2 || partes[0] === '') {
        return 'Escribe un correo válido, por ejemplo: juan@duoc.cl';
    }
    if (!DOMINIOS_PERMITIDOS.includes(partes[1])) {
        return 'Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com';
    }
    return '';
}


export function validarTexto(valor, nombreCampo, maximo) {
    if (valor === '') {
        return `El campo ${nombreCampo} es obligatorio.`;
    }
    if (valor.length > maximo) {
        return `${nombreCampo} no puede tener más de ${maximo} caracteres.`;
    }
    return '';
}


export function validarContrasena(valor) {
    if (valor === '') {
        return 'La contraseña es obligatoria.';
    }
    if (valor.length < 4 || valor.length > 10) {
        return 'La contraseña debe tener entre 4 y 10 caracteres.';
    }
    return '';
}


export function validarRun(valor) {
    const run = valor.toUpperCase();

    if (run === '') {
        return 'El RUN es obligatorio.';
    }
    if (run.includes('.') || run.includes('-')) {
        return 'Escribe el RUN sin puntos ni guion. Ej: 123456785';
    }
    if (run.length < 7 || run.length > 9) {
        return 'El RUN debe tener entre 7 y 9 caracteres.';
    }

    const cuerpo = run.slice(0, -1);
    const dv = run.slice(-1);

    if (!/^[0-9]+$/.test(cuerpo)) {
        return 'El RUN solo puede tener números (y una K al final).';
    }


    let suma = 0;
    let multiplicador = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma = suma + Number(cuerpo[i]) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const resultado = 11 - (suma % 11);
    let dvEsperado;
    if (resultado === 11) {
        dvEsperado = '0';
    } else if (resultado === 10) {
        dvEsperado = 'K';
    } else {
        dvEsperado = String(resultado);
    }

    if (dv !== dvEsperado) {
        return 'El RUN no es válido. Revisa el dígito verificador.';
    }
    return '';
}


export function validarFecha(valor) {
    if (valor === '') {
        return '';
    }
    if (new Date(valor) > new Date()) {
        return 'La fecha de nacimiento no puede ser en el futuro.';
    }
    return '';
}

export function validarSelect(valor, mensaje) {
    return valor === '' ? mensaje : '';
}


export function hayErrores(errores) {
    return Object.values(errores).some(error => error !== '');
}