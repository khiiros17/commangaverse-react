// ============================================================
//  VALIDACIONES DEL FORMULARIO DE PRODUCTOS (panel admin)
//  Igual que validaciones.js: cada función devuelve el ERROR o "".
// ============================================================
import { validarTexto } from './validaciones';

/** Código: obligatorio y de al menos 3 caracteres. */
export function validarCodigo(valor) {
    if (valor === '') {
        return 'El código es obligatorio.';
    }
    if (valor.length < 3) {
        return 'El código debe tener al menos 3 caracteres.';
    }
    return '';
}

/** Precio: obligatorio, número mayor o igual a 0. */
export function validarPrecio(valor) {
    if (valor === '') {
        return 'El precio es obligatorio.';
    }
    const numero = Number(valor);
    if (isNaN(numero) || numero < 0) {
        return 'El precio debe ser un número mayor o igual a 0.';
    }
    return '';
}

/** Precio de oferta: opcional, pero si se escribe debe ser MENOR al precio normal. */
export function validarPrecioOferta(valor, precio) {
    if (valor === '') {
        return '';
    }
    const numero = Number(valor);
    if (isNaN(numero) || numero < 0) {
        return 'La oferta debe ser un número mayor o igual a 0.';
    }
    if (numero >= Number(precio)) {
        return 'La oferta debe ser menor que el precio normal.';
    }
    return '';
}

/** Stock: número ENTERO mayor o igual a 0 (obligatorio o no). */
export function validarStock(valor, obligatorio = true) {
    if (valor === '') {
        return obligatorio ? 'El stock es obligatorio.' : '';
    }
    const numero = Number(valor);
    if (!Number.isInteger(numero) || numero < 0) {
        return 'Debe ser un número entero mayor o igual a 0.';
    }
    return '';
}

/** Qué regla usa cada campo. "datos" se usa para comparar la oferta con el precio. */
export function validarCampoProducto(nombre, valor, datos) {
    switch (nombre) {
        case 'codigo': return validarCodigo(valor.trim());
        case 'nombre': return validarTexto(valor.trim(), 'Nombre', 100);
        case 'descripcion': return valor.length > 500 ? 'La descripción no puede tener más de 500 caracteres.' : '';
        case 'precio': return validarPrecio(valor);
        case 'precioOferta': return validarPrecioOferta(valor, datos.precio);
        case 'stock': return validarStock(valor);
        case 'stockCritico': return validarStock(valor, false);
        case 'categoria': return validarTexto(valor.trim(), 'Categoría', 50);
        default: return '';
    }
}

/** Valida TODOS los campos y devuelve un objeto con los errores. */
export function validarProducto(datos) {
    const errores = {};
    Object.keys(datos).forEach(campo => {
        errores[campo] = validarCampoProducto(campo, String(datos[campo]), datos);
    });
    return errores;
}

/** Regla de negocio: ¿otro producto ya usa este código? */
export function codigoRepetido(productos, codigo, idActual = null) {
    return productos.some(
        p => p.codigo.toUpperCase() === codigo.trim().toUpperCase() && p.id !== idActual
    );
}

/** Un producto está en stock crítico si su stock es menor o igual al stock crítico. */
export function esCritico(producto) {
    return producto.stockCritico !== null
        && producto.stockCritico !== undefined
        && producto.stock <= producto.stockCritico;
}