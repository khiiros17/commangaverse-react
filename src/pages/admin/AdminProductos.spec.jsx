// pruebas unitarias para la pagina de administracion de productos
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminProductos from './AdminProductos';

const productos = [
    { id: 1, codigo: 'COM-001', nombre: 'Spider-Man #1', precio: 12990, precioOferta: null, stock: 15, stockCritico: 5, categoria: 'Superhéroes' },
    { id: 2, codigo: 'MAN-002', nombre: 'Naruto Vol. 1', precio: 8490, precioOferta: null, stock: 3, stockCritico: 5, categoria: 'Manga' }
];

function dibujar(onEliminar = () => { }) {
    return render(
        <MemoryRouter>
            <AdminProductos productos={productos} onEliminar={onEliminar} />
        </MemoryRouter>
    );
}

describe('AdminProductos', () => {

    it('debería listar todos los productos y marcar los críticos', () => {
        dibujar();
        expect(screen.getByText('Spider-Man #1')).toBeTruthy();
        expect(screen.getByText('Naruto Vol. 1')).toBeTruthy();
        expect(screen.getAllByText('Crítico').length).toBe(1);
    });


    it('debería mostrar solo los críticos al activar el interruptor', () => {
        dibujar();

        fireEvent.click(screen.getByLabelText('Mostrar solo productos con stock crítico'));

        expect(screen.queryByText('Spider-Man #1')).toBeNull();
        expect(screen.getByText('Naruto Vol. 1')).toBeTruthy();
    });


    it('debería eliminar si se confirma', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        const espia = jasmine.createSpy('onEliminar');
        dibujar(espia);

        fireEvent.click(screen.getByLabelText('Eliminar Naruto Vol. 1'));

        expect(window.confirm).toHaveBeenCalled();
        expect(espia).toHaveBeenCalledWith(2);
    });


    it('NO debería eliminar si se cancela', () => {
        spyOn(window, 'confirm').and.returnValue(false);
        const espia = jasmine.createSpy('onEliminar');
        dibujar(espia);

        fireEvent.click(screen.getByLabelText('Eliminar Naruto Vol. 1'));

        expect(espia).not.toHaveBeenCalled();
    });

});