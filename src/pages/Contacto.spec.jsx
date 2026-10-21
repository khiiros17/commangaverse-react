// pruebas unitarias para la pagina de contacto
import { render, screen, fireEvent } from '@testing-library/react';
import Contacto from './Contacto';

describe('Página Contacto', () => {


    it('debería actualizar el contador de caracteres al escribir', () => {
        render(<Contacto />);

        fireEvent.change(screen.getByLabelText('Comentario'), { target: { value: 'Hola!' } });

        expect(screen.getByText('5 / 500')).toBeTruthy();
    });


    it('debería mostrar los errores al enviar el formulario vacío', () => {
        render(<Contacto />);

        fireEvent.click(screen.getByText('Enviar mensaje'));

        expect(screen.getByText('El campo Nombre es obligatorio.')).toBeTruthy();
        expect(screen.getByText('El campo Comentario es obligatorio.')).toBeTruthy();
    });

    it('debería mostrar el mensaje de éxito con datos válidos (correo opcional vacío)', () => {
        render(<Contacto />);

        fireEvent.change(screen.getByLabelText('Nombre completo'), { target: { value: 'Javier' } });
        fireEvent.change(screen.getByLabelText('Comentario'), { target: { value: '¿Tienen Akira?' } });
        fireEvent.click(screen.getByText('Enviar mensaje'));

        expect(screen.getByText(/Tu mensaje fue enviado/)).toBeTruthy();
    });

});