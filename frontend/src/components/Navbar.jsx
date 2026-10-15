import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartSidebar from './CartSidebar';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const { cartCount } = useContext(CartContext);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <>
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

                <div className="header-right-actions">
                    {token ? (
                        <button 
                            onClick={handleLogout} 
                            className="header-auth-link"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                        >
                            Cerrar Sesión
                        </button>
                    ) : (
                        <Link to="/login" className="header-auth-link">
                            Iniciar Sesión
                        </Link>
                    )}

                    {/* Botón de Carrito en el Navbar que lleva a la página dedicada /cart */}
                    <Link to="/cart" aria-label="Ver carrito de compras" style={{ textDecoration: 'none' }}>
                        <div className="header-cart-button">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            {cartCount > 0 && (
                                <span className="header-cart-badge">{cartCount}</span>
                            )}
                        </div>
                    </Link>
                </div>
            </header>

            {/* Sidebar Amazon-style: se abre automáticamente al agregar un producto */}
            <CartSidebar />
        </>
    );
};

export default Navbar;