// ============================================================
//  PRUEBAS: componente Precio
// ============================================================
import { render, screen } from '@testing-library/react';
import Precio from './Precio';

describe('Precio', () => {

    // PROPS + RENDERIZADO CONDICIONAL: sin oferta
    it('debería mostrar solo el precio normal si no hay oferta', () => {
        render(<Precio producto={{ precio: 12990, precioOferta: null }} />);

        expect(screen.getByText('$12.990')).toBeTruthy();
        expect(screen.queryByText('Oferta')).toBeNull();
    });

    // PROPS + RENDERIZADO CONDICIONAL: con oferta
    it('debería mostrar la etiqueta Oferta, el precio rebajado y el anterior', () => {
        render(<Precio producto={{ precio: 12990, precioOferta: 9990 }} />);

        expect(screen.getByText('Oferta')).toBeTruthy();
        expect(screen.getByText(/\$9\.990/)).toBeTruthy();
        expect(screen.getByText('$12.990').className).toContain('precio-anterior');
    });

});