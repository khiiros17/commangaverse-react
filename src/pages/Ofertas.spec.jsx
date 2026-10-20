// ============================================================
//  PRUEBAS: página Ofertas
// ============================================================
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Ofertas from './Ofertas';

const IMAGEN_PRUEBA = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

describe('Página Ofertas', () => {

    it('debería mostrar solo los productos con precio de oferta', () => {
        const productos = [
            { id: 1, nombre: 'Con oferta', precio: 10000, precioOferta: 8000, categoria: 'Manga', imagen: IMAGEN_PRUEBA },
            { id: 2, nombre: 'Sin oferta', precio: 10000, precioOferta: null, categoria: 'Manga', imagen: IMAGEN_PRUEBA }
        ];

        render(<MemoryRouter><Ofertas productos={productos} onAgregar={() => { }} /></MemoryRouter>);

        expect(screen.getByText('Con oferta')).toBeTruthy();
        expect(screen.queryByText('Sin oferta')).toBeNull();
    });

    it('debería avisar si no hay ofertas', () => {
        const productos = [
            { id: 2, nombre: 'Sin oferta', precio: 10000, precioOferta: null, categoria: 'Manga', imagen: IMAGEN_PRUEBA }
        ];

        render(<MemoryRouter><Ofertas productos={productos} onAgregar={() => { }} /></MemoryRouter>);

        expect(screen.getByText(/no hay productos en oferta/)).toBeTruthy();
    });

});