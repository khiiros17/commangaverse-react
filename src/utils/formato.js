// Convierte 12990 en "$12.990"
export function formatearPrecio(valor) {
    return "$" + Number(valor).toLocaleString("es-CL");
}