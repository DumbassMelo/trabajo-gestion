import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await api.post('/Auth/register', formData);
            alert('Registro exitoso. Ahora puedes iniciar sesión con tu cuenta.');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data || 'Error al registrar el usuario. Verifica los datos.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Header consistente con la marca */}
            <header className="sales-header">
                <Link to="/" className="brand-container">
                    <div className="brand-icon">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="3" width="20" height="14" rx="2.5" ry="2.5"></rect>
                            <line x1="8" y1="21" x2="16" y2="21"></line>
                            <line x1="12" y1="17" x2="12" y2="21"></line>
                        </svg>
                    </div>
                    <span className="brand-title">Sales web</span>
                </Link>
            </header>

            <main className="page-canvas">
                <div className="auth-wrapper">
                    <div className="auth-card">
                        <h1 className="auth-title">Crear Cuenta</h1>
                        <p className="auth-subtitle">Completa tus datos para registrarte en la tienda</p>
                        
                        {error && (
                            <div className="auth-error-alert">
                                {typeof error === 'string' ? error : JSON.stringify(error)}
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="auth-name-grid">
                                <div className="auth-field-group">
                                    <label className="auth-label">Nombre</label>
                                    <input 
                                        type="text" 
                                        name="firstName" 
                                        placeholder="Tu nombre" 
                                        value={formData.firstName}
                                        onChange={handleChange} 
                                        required 
                                        className="auth-input"
                                    />
                                </div>
                                <div className="auth-field-group">
                                    <label className="auth-label">Apellido</label>
                                    <input 
                                        type="text" 
                                        name="lastName" 
                                        placeholder="Tu apellido" 
                                        value={formData.lastName}
                                        onChange={handleChange} 
                                        required 
                                        className="auth-input"
                                    />
                                </div>
                            </div>

                            <div className="auth-field-group">
                                <label className="auth-label">Correo electrónico</label>
                                <input 
                                    type="email" 
                                    name="emailAddress" 
                                    placeholder="nombre@ejemplo.com" 
                                    value={formData.emailAddress}
                                    onChange={handleChange} 
                                    required 
                                    className="auth-input"
                                />
                            </div>

                            <div className="auth-field-group">
                                <label className="auth-label">Contraseña</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    placeholder="Mínimo 6 caracteres" 
                                    value={formData.password}
                                    onChange={handleChange} 
                                    required 
                                    className="auth-input"
                                />
                            </div>
                            
                            <button 
                                type="submit" 
                                className="btn-primary-dark"
                                disabled={loading}
                                style={{ marginTop: '8px' }}
                            >
                                {loading ? 'Creando cuenta...' : 'Registrarme'}
                            </button>
                        </form>

                        <div className="auth-footer">
                            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Register;