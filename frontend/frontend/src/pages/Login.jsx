import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
    const [formData, setFormData] = useState({
        emailAddress: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/Auth/login', formData);
            
            // 1. Guardar el token en el LocalStorage
            localStorage.setItem('token', response.data.token);
            
            // 2. Redirigir al inicio o panel del usuario
            navigate('/'); 
        } catch (err) {
            setError(err.response?.data || 'Credenciales inválidas');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
            <h2>Iniciar Sesión</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="email" name="emailAddress" placeholder="Correo electrónico" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
                
                <button type="submit">Ingresar</button>
            </form>
            <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
        </div>
    );
};

export default Login;