import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

// Componente rápido para simular la vista principal protegida
const Home = () => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('token'); // Borramos el token
        navigate('/login'); // Expulsamos al login
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Bienvenido a AdventureWorks E-Commerce</h1>
            <p>Si estás viendo esto, es porque tienes un token válido.</p>
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas Públicas */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Rutas Privadas (Protegidas) */}
                <Route 
                    path="/" 
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
