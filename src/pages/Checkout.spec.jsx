// pruebas unitarias para la página de checkout
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Checkout from './Checkout';

const productos = [
    { id: 1, nombre: 'Spider-Man #1', precio: 12990, precioOferta: null, stock: 10, categoria: 'Superhéroes' }
];
const carrito = [{ id: 1, cantidad: 2 }];

const usuario = {
    nombre: 'Ana', apellidos: 'Pérez', correo: 'ana@duoc.cl',
    region: 'Región Metropolitana', comuna: 'Santiago', direccion: 'Calle 123'
};


function dibujarCheckout({ carritoPrueba = carrito, usuarioPrueba = null, onConfirmar = () => { } } = {}) {
    return render(
        <MemoryRouter initialEntries={['/checkout']}>
            <Routes>
                <Route path="/checkout" element={
                    <Checkout carrito={carritoPrueba} productos={productos}
                        usuario={usuarioPrueba} onConfirmarCompra={onConfirmar} />
                } />
                <Route path="/pago-exitoso/:id" element={<p>Página de éxito</p>} />
                <Route path="/pago-error/:id" element={<p>Página de error</p>} />
            </Routes>
        </MemoryRouter>
    );
}

function escribir(etiqueta, texto) {
    fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: texto } });
}

describe('Página Checkout', () => {

    it('debería avisar si el carrito está vacío', () => {
        dibujarCheckout({ carritoPrueba: [] });
        expect(screen.getByText(/No hay productos para pagar/)).toBeTruthy();
    });

    it('debería mostrar el total a pagar', () => {
        dibujarCheckout();
        expect(screen.getByTestId('total-checkout').textContent).toBe('$25.980');
    });


    it('debería completar los datos si hay una sesión iniciada', () => {
        dibujarCheckout({ usuarioPrueba: usuario });

        expect(screen.getByLabelText('Nombre').value).toBe('Ana');
        expect(screen.getByLabelText('Correo electrónico').value).toBe('ana@duoc.cl');
        expect(screen.getByLabelText('Comuna').value).toBe('Santiago');
    });


    it('NO debería confirmar la compra si el formulario tiene errores', () => {
        const espia = jasmine.createSpy('onConfirmarCompra');
        dibujarCheckout({ onConfirmar: espia });

        fireEvent.click(screen.getByRole('button', { name: /Pagar ahora/ }));

        expect(espia).not.toHaveBeenCalled();
        expect(screen.getByText('El número de tarjeta es obligatorio.')).toBeTruthy();
    });


    it('debería ir a Pago exitoso cuando la orden queda Pagada', () => {
        const espia = jasmine.createSpy('onConfirmarCompra').and.returnValue({ id: 7, estado: 'Pagada' });
        dibujarCheckout({ usuarioPrueba: usuario, onConfirmar: espia });

        escribir('Número de tarjeta', '4111111111111111');
        fireEvent.click(screen.getByRole('button', { name: /Pagar ahora/ }));

        expect(espia).toHaveBeenCalled();
        expect(espia.calls.mostRecent().args[0].correo).toBe('ana@duoc.cl');
        expect(espia.calls.mostRecent().args[1]).toBe('4111111111111111');
        expect(screen.getByText('Página de éxito')).toBeTruthy();
    });


    it('debería ir a Pago con error cuando la orden queda Rechazada', () => {
        const espia = jasmine.createSpy('onConfirmarCompra').and.returnValue({ id: 8, estado: 'Rechazada' });
        dibujarCheckout({ usuarioPrueba: usuario, onConfirmar: espia });

        escribir('Número de tarjeta', '4111111111110000');
        fireEvent.click(screen.getByRole('button', { name: /Pagar ahora/ }));

        expect(screen.getByText('Página de error')).toBeTruthy();
    });

});