// validaciones del producto
import { validarTexto } from './validaciones';


export function validarCodigo(valor) {
    if (valor === '') {
        return 'El código es obligatorio.';
    }
    if (valor.length < 3) {
        return 'El código debe tener al menos 3 caracteres.';
    }
    return '';
}


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

export function validarProducto(datos) {
    const errores = {};
    Object.keys(datos).forEach(campo => {
        errores[campo] = validarCampoProducto(campo, String(datos[campo]), datos);
    });
    return errores;
}


export function codigoRepetido(productos, codigo, idActual = null) {
    return productos.some(
        p => p.codigo.toUpperCase() === codigo.trim().toUpperCase() && p.id !== idActual
    );
}


export function esCritico(producto) {
    return producto.stockCritico !== null
        && producto.stockCritico !== undefined
        && producto.stock <= producto.stockCritico;
}