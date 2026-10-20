// ============================================================
//  PRUEBAS: página Login (estado, eventos y renderizado condicional)
// ============================================================
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

function dibujarLogin(onLogin) {
    return render(
        <MemoryRouter>
            <Login onLogin={onLogin} />
        </MemoryRouter>
    );
}

// Simula que la persona escribe en un campo
function escribir(etiqueta, texto) {
    fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: texto } });
}

describe('Página Login', () => {

    beforeEach(() => {
        localStorage.clear();      // usuarios iniciales (incluye admin@duoc.cl / admin123)
        sessionStorage.clear();    // sin sesión iniciada
    });

    // PRUEBA DE ESTADO: el input muestra lo que se escribe
    it('debería actualizar el estado al escribir el correo', () => {
        dibujarLogin(() => { });

        escribir('Correo electrónico', 'ana@duoc.cl');

        expect(screen.getByLabelText('Correo electrónico').value).toBe('ana@duoc.cl');
    });

    // RENDERIZADO CONDICIONAL: el error aparece SOLO cuando hay error
    it('NO debería mostrar errores al principio', () => {
        dibujarLogin(() => { });
        expect(screen.queryByText(/Solo se aceptan/)).toBeNull();
    });

    it('debería mostrar un error en tiempo real si el dominio no es válido', () => {
        dibujarLogin(() => { });

        escribir('Correo electrónico', 'ana@hotmail.com');

        expect(screen.getByText(/Solo se aceptan/)).toBeTruthy();
    });

    // EVENTOS + MOCK: un login correcto avisa a la App
    it('debería llamar a onLogin con el usuario si los datos son correctos', () => {
        const espia = jasmine.createSpy('onLogin');
        dibujarLogin(espia);

        escribir('Correo electrónico', 'admin@duoc.cl');
        escribir('Contraseña', 'admin123');
        fireEvent.click(screen.getByText('Ingresar'));

        expect(espia).toHaveBeenCalledTimes(1);
        expect(espia.calls.mostRecent().args[0].correo).toBe('admin@duoc.cl');
    });

    it('debería mostrar un mensaje si la contraseña es incorrecta', () => {
        const espia = jasmine.createSpy('onLogin');
        dibujarLogin(espia);

        escribir('Correo electrónico', 'admin@duoc.cl');
        escribir('Contraseña', 'otraClave');
        fireEvent.click(screen.getByText('Ingresar'));

        expect(screen.getByText('Correo o contraseña incorrectos.')).toBeTruthy();
        expect(espia).not.toHaveBeenCalled();
    });

});