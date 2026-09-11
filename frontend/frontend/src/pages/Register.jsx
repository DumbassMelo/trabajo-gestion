import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Actualiza el estado cuando el usuario escribe
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Cambia el puerto por el que usa tu API de ASP.NET Core
            await axios.post('https://localhost:7285/api/Auth/register', formData);
            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            navigate('/login'); // Redirige al login tras el éxito
        } catch (err) {
            setError(err.response?.data || 'Error al registrar el usuario');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
            <h2>Crear Cuenta</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="text" name="firstName" placeholder="Nombre" onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="Apellido" onChange={handleChange} required />
                <input type="email" name="emailAddress" placeholder="Correo electrónico" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
                
                <button type="submit">Registrarme</button>
            </form>
            <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
        </div>
    );
};

export default Register;