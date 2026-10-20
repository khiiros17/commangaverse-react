import { Navigate } from 'react-router-dom';

// ============================================================
//  RUTA PROTEGIDA: solo deja pasar al Administrador.
//  Si no hay sesión, o no es administrador, lo manda al login.
// ============================================================
function RutaAdmin({ usuario, children }) {
    if (!usuario || usuario.tipo !== 'Administrador') {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default RutaAdmin;