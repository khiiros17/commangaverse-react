// pruebas unitarias para la página de carrito
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Carrito from './Carrito';

const IMAGEN_PRUEBA = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

const productos = [
    { id: 1, nombre: 'Spider-Man #1', precio: 10000, precioOferta: null, stock: 5, imagen: IMAGEN_PRUEBA },
    { id: 2, nombre: 'Naruto Vol. 1', precio: 8000, precioOferta: 6000, stock: 1, imagen: IMAGEN_PRUEBA }
];


function dibujarCarrito(carrito, espias) {
    return render(
        <MemoryRouter>
            <Carrito
                carrito={carrito}
                productos={productos}
                onCambiarCantidad={espias.cambiar}
                onQuitar={espias.quitar}
                onVaciar={espias.vaciar}
            />
        </MemoryRouter>
    );
}

describe('Página Carrito', () => {
    let espias;

    beforeEach(() => {
        espias = {
            cambiar: jasmine.createSpy('onCambiarCantidad'),
            quitar: jasmine.createSpy('onQuitar'),
            vaciar: jasmine.createSpy('onVaciar')
        };
    });


    it('debería mostrar un mensaje si el carrito está vacío', () => {
        dibujarCarrito([], espias);
        expect(screen.getByText(/Tu carrito está vacío/)).toBeTruthy();
    });


    it('debería mostrar los productos y el total correcto', () => {
        dibujarCarrito([{ id: 1, cantidad: 2 }, { id: 2, cantidad: 1 }], espias);

        expect(screen.getByText('Spider-Man #1')).toBeTruthy();
        expect(screen.getByText('Naruto Vol. 1')).toBeTruthy();

        expect(screen.getByTestId('total-carrito').textContent).toBe('$26.000');
    });


    it('debería llamar a onCambiarCantidad con +1 al apretar el botón +', () => {
        dibujarCarrito([{ id: 1, cantidad: 2 }], espias);

        fireEvent.click(screen.getByLabelText('Sumar Spider-Man #1'));

        expect(espias.cambiar).toHaveBeenCalledWith(1, 1);
    });

    it('debería llamar a onQuitar al apretar Quitar', () => {
        dibujarCarrito([{ id: 1, cantidad: 2 }], espias);

        fireEvent.click(screen.getByText('Quitar'));

        expect(espias.quitar).toHaveBeenCalledWith(1);
    });


    it('debería desactivar el botón + cuando se alcanza el stock', () => {
        dibujarCarrito([{ id: 2, cantidad: 1 }], espias);

        expect(screen.getByLabelText('Sumar Naruto Vol. 1').disabled).toBeTrue();
    });

});