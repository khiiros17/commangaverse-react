// fecha
export function formatearFecha(textoFecha) {
    return new Date(textoFecha).toLocaleString('es-CL');
}