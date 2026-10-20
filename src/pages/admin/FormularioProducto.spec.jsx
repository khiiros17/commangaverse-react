// ============================================================
//  PRUEBAS: formulario para crear y editar productos
// ============================================================
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import FormularioProducto from './FormularioProducto';

const productos = [
    {
        id: 1, codigo: 'COM-001', nombre: 'Spider-Man #1', descripcion: '', precio: 12990, precioOferta: null,
        stock: 15, stockCritico: 5, categoria: 'Superhéroes', imagen: '/img/spiderman.jpg'
    }
];

function dibujarEn(direccion, onGuardar = () => { }) {
    return render(
        <MemoryRouter initialEntries={[direccion]}>
            <Routes>
                <Route path="/admin/productos/nuevo" element={<FormularioProducto productos={productos} onGuardar={onGuardar} />} />
                <Route path="/admin/productos/editar/:id" element={<FormularioProducto productos={productos} onGuardar={onGuardar} />} />
                <Route path="/admin/productos" element={<p>Listado de productos</p>} />
            </Routes>
        </MemoryRouter>
    );
}

function escribir(etiqueta, texto) {
    fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: texto } });
}

describe('FormularioProducto', () => {

    it('NO debería guardar si el formulario está vacío', () => {
        const espia = jasmine.createSpy('onGuardar');
        dibujarEn('/admin/productos/nuevo', espia);

        fireEvent.click(screen.getByText('Crear producto'));

        expect(espia).not.toHaveBeenCalled();
        expect(screen.getByText('El código es obligatorio.')).toBeTruthy();
        expect(screen.getByText('El precio es obligatorio.')).toBeTruthy();
    });

    it('debería crear un producto con los tipos correctos y volver al listado', () => {
        const espia = jasmine.createSpy('onGuardar');
        dibujarEn('/admin/productos/nuevo', espia);

        escribir('Código', 'man-010');
        escribir('Nombre', 'Akira Vol. 1');
        escribir('Precio', '14990');
        escribir('Stock', '10');
        escribir('Categoría', 'Manga');
        fireEvent.click(screen.getByText('Crear producto'));

        const [producto, id] = espia.calls.mostRecent().args;
        expect(id).toBeNull();                       // null = crear
        expect(producto.codigo).toBe('MAN-010');     // se guarda en mayúsculas
        expect(producto.precio).toBe(14990);         // número, no texto
        expect(producto.precioOferta).toBeNull();    // sin oferta
        expect(screen.getByText('Listado de productos')).toBeTruthy();
    });

    it('debería avisar si el código ya lo usa otro producto', () => {
        const espia = jasmine.createSpy('onGuardar');
        dibujarEn('/admin/productos/nuevo', espia);

        escribir('Código', 'COM-001');
        escribir('Nombre', 'Otro');
        escribir('Precio', '1000');
        escribir('Stock', '1');
        escribir('Categoría', 'Manga');
        fireEvent.click(screen.getByText('Crear producto'));

        expect(espia).not.toHaveBeenCalled();
        expect(screen.getByText('Ya existe otro producto con este código.')).toBeTruthy();
    });

    it('debería avisar en tiempo real si la oferta no es menor al precio', () => {
        dibujarEn('/admin/productos/nuevo');

        escribir('Precio', '5000');
        escribir('Precio oferta (opcional)', '6000');

        expect(screen.getByText('La oferta debe ser menor que el precio normal.')).toBeTruthy();
    });

    // MODO EDITAR: los datos vienen cargados y se guarda con el id
    it('debería cargar los datos al editar y guardar con el mismo id', () => {
        const espia = jasmine.createSpy('onGuardar');
        dibujarEn('/admin/productos/editar/1', espia);

        expect(screen.getByLabelText('Nombre').value).toBe('Spider-Man #1');

        escribir('Stock', '40');
        fireEvent.click(screen.getByText('Guardar cambios'));

        const [producto, id] = espia.calls.mostRecent().args;
        expect(id).toBe(1);
        expect(producto.stock).toBe(40);
    });

});