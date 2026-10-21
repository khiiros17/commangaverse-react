import { Navigate } from 'react-router-dom';

// ruta para dejar pasar al admin en caso de error o algo mas.
function RutaAdmin({ usuario, children }) {
    if (!usuario || usuario.tipo !== 'Administrador') {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default RutaAdmin;