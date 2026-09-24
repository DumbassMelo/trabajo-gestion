import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', backgroundColor: '#333', color: 'white' }}>
            <h2>AdventureWorks</h2>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Catálogo</Link>
                {token ? (
                    <button onClick={handleLogout} style={{ cursor: 'pointer' }}>Cerrar Sesión</button>
                ) : (
                    <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Iniciar Sesión</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;