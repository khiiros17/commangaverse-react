// ============================================================
//  BASE DE DATOS SIMULADA
//  Único archivo que habla directamente con localStorage.
//  Si en el futuro hay un backend, solo se cambia este archivo.
// ============================================================

/**
 * Lee datos guardados en localStorage.
 * @param {string} clave - El nombre con que se guardaron (ej: "productos")
 * @param {*} valorInicial - Lo que se devuelve si todavía no hay nada guardado
 */
export function leerDatos(clave, valorInicial) {
    const guardado = localStorage.getItem(clave);

    // Primera vez: no hay nada guardado
    if (guardado === null) {
        return valorInicial;
    }

    // Intenta convertir el texto en datos
    try {
        return JSON.parse(guardado);
    } catch {
        // Si el texto está dañado, usa el valor inicial en vez de romper la página
        return valorInicial;
    }
}

/**
 * Guarda datos en localStorage.
 * @param {string} clave - El nombre con que se guardan
 * @param {*} datos - La lista u objeto a guardar
 */
export function guardarDatos(clave, datos) {
    localStorage.setItem(clave, JSON.stringify(datos));
}