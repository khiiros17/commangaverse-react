// pruebas unitarias para la pagina de resultado de pag o exitoso y de pago rechazado
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Registro from './Registro';

function dibujarRegistro() {
    return render(
        <MemoryRouter>
            <Registro />
        </MemoryRouter>
    );
}

describe('Página Registro', () => {

    beforeEach(() => {
        localStorage.clear();
    });


    it('debería cargar las comunas al elegir una región', () => {
        dibujarRegistro();
        const selectComuna = screen.getByLabelText('Comuna');
        expect(selectComuna.disabled).toBeTrue();

        fireEvent.change(screen.getByLabelText('Región'), { target: { value: 'Valparaíso' } });

        expect(selectComuna.disabled).toBeFalse();
        expect(screen.getByText('Viña del Mar')).toBeTruthy();
    });


    it('debería mostrar un error si el RUN es inválido', () => {
        dibujarRegistro();

        fireEvent.change(screen.getByLabelText('RUN'), { target: { value: '123456789' } });

        expect(screen.getByText(/dígito verificador/)).toBeTruthy();
    });

});