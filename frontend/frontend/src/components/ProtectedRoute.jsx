import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Buscamos el token en el almacenamiento local
    const token = localStorage.getItem('token');

    // Si no hay token, redirigimos al login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Si hay token, renderizamos el componente hijo (la ruta privada)
    return children;
};

export default ProtectedRoute;