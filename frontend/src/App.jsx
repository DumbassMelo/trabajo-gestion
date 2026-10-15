import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail'; // <-- Importa el nuevo componente
import ProtectedRoute from './components/ProtectedRoute';

// Componente rápido para simular la vista principal protegida


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Catálogo Protegido */}
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                
                {/* Detalle del Producto Protegido */}
                <Route path="/product/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
