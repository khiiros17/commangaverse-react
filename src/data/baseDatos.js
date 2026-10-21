
//  base de datos.
//  localStorage.


/**
 * para leer los datos guardaddos en el local storage.
 * @param {string} clave - nombre con el que seguardan 
 * @param {*} valorInicial
 */

// para leer los datos guardados en el local storage.
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
 * Guarda datos.
 * @param {string} clave - El nombre con que se guardan
 * @param {*} datos - La lista, objeto a guardar
 */

// pra guardar datos en el local storage.
export function guardarDatos(clave, datos) {
    localStorage.setItem(clave, JSON.stringify(datos));
}