import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
    const [formData, setFormData] = useState({
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
            const response = await api.post('/Auth/login', formData);
            
            // 1. Guardar el token en el LocalStorage
            localStorage.setItem('token', response.data.token);
            
            // 2. Redirigir al catálogo principal
            navigate('/'); 
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data || 'Credenciales inválidas. Por favor intenta de nuevo.');
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
                        <h1 className="auth-title">Iniciar Sesión</h1>
                        <p className="auth-subtitle">Ingresa tus credenciales para acceder a la tienda</p>
                        
                        {error && (
                            <div className="auth-error-alert">
                                {typeof error === 'string' ? error : JSON.stringify(error)}
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit} className="auth-form">
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
                                    placeholder="••••••••" 
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
                                {loading ? 'Iniciando sesión...' : 'Ingresar'}
                            </button>
                        </form>

                        <div className="auth-footer">
                            ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Login;