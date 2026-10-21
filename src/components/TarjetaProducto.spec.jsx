// pruebas unitarias de tarjeta con los productos.
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TarjetaProducto from './TarjetaProducto';


const IMAGEN_PRUEBA = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';


const comicDePrueba = {
    id: 7,
    nombre: 'Cómic de prueba',
    precio: 12990,
    categoria: 'Manga',
    imagen: IMAGEN_PRUEBA
};


function dibujarTarjeta(onAgregar) {
    return render(
        <MemoryRouter>
            <TarjetaProducto producto={comicDePrueba} onAgregar={onAgregar} />
        </MemoryRouter>
    );
}

describe('TarjetaProducto', () => {


    it('debería mostrar el nombre, la categoría y el precio del producto', () => {
        dibujarTarjeta(() => { });

        expect(screen.getByText('Cómic de prueba')).toBeTruthy();
        expect(screen.getByText('Manga')).toBeTruthy();
        expect(screen.getByText('$12.990')).toBeTruthy();
    });


    it('debería llamar a onAgregar con el id del producto al hacer clic', () => {
        const espia = jasmine.createSpy('onAgregar');
        dibujarTarjeta(espia);

        fireEvent.click(screen.getByText('Añadir al carrito'));

        expect(espia).toHaveBeenCalledTimes(1);
        expect(espia).toHaveBeenCalledWith(7);
    });


    it('debería tener un link al detalle del producto', () => {
        dibujarTarjeta(() => { });

        const link = screen.getByText('Cómic de prueba').closest('a');
        expect(link.getAttribute('href')).toBe('/producto/7');
    });

});