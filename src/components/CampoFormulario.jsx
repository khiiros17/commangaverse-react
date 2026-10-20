import { Form } from 'react-bootstrap';

// ============================================================
//  CAMPO DE FORMULARIO REUTILIZABLE (molécula: etiqueta + input + error)
// ============================================================
function CampoFormulario({
    etiqueta,
    nombre,
    valor,
    error,
    onChange,
    tipo = 'text',
    placeholder = '',
    ayuda = '',
    multilinea = false
}) {
    return (
        <Form.Group className="mb-3" controlId={nombre}>
            <Form.Label>{etiqueta}</Form.Label>

            <Form.Control
                as={multilinea ? 'textarea' : 'input'}
                rows={multilinea ? 4 : undefined}
                type={multilinea ? undefined : tipo}
                name={nombre}
                value={valor}
                onChange={onChange}
                placeholder={placeholder}
                isInvalid={error !== '' && error !== undefined}
                isValid={valor !== '' && !error}
            />

            {/* Texto de ayuda: solo si se entrega */}
            {ayuda && <Form.Text className="text-secondary">{ayuda}</Form.Text>}

            {/* Mensaje de error: Bootstrap lo muestra solo si isInvalid es true */}
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>
    );
}

export default CampoFormulario;