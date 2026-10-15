import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Navbar from '../components/Navbar';
import PlaceholderImage from '../components/PlaceholderImage';

const Cart = () => {
    const { cart, updateQuantity, removeFromCart, cartTotal, cartCount, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (cart.length === 0) return;
        alert('¡Gracias por tu compra! Tu pedido ha sido procesado exitosamente.');
        clearCart();
        navigate('/');
    };

    return (
        <div>
            <Navbar />

            <main className="page-canvas">
                <div className="white-card">
                    {/* Header de la página del carrito tal como en la imagen 3 */}
                    <div className="cart-page-header">
                        <h1 className="cart-heading">Carrito de compras</h1>
                        <p className="cart-subheading">
                            {cartCount > 0 
                                ? `${cartCount} ${cartCount === 1 ? 'artículo seleccionado' : 'artículos seleccionados'} en tu orden de compra.`
                                : 'Tu carrito de compras está actualmente vacío.'}
                        </p>
                    </div>

                    {cart.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                            <div style={{ width: '80px', height: '80px', margin: '0 auto 20px', color: '#9ca3af' }}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="9" cy="21" r="1"></circle>
                                    <circle cx="20" cy="21" r="1"></circle>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                </svg>
                            </div>
                            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', marginBottom: '8px' }}>
                                Aún no has agregado ningún producto
                            </h3>
                            <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>
                                Explora nuestro catálogo de productos para encontrar lo que necesitas.
                            </p>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <button className="btn-primary-dark" style={{ width: 'auto', padding: '12px 28px', margin: '0 auto' }}>
                                    Explorar Catálogo
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="cart-page-layout">
                            {/* Columna Izquierda: Lista de productos en tarjetas horizontales */}
                            <div className="cart-items-list">
                                {cart.map(item => (
                                    <div key={item.productId} className="cart-item-card">
                                        <div className="cart-item-thumb">
                                            {item.thumbnailPhoto ? (
                                                <img 
                                                    src={`data:image/gif;base64,${item.thumbnailPhoto}`} 
                                                    alt={item.name} 
                                                />
                                            ) : (
                                                <PlaceholderImage />
                                            )}
                                        </div>

                                        <div className="cart-item-body">
                                            <h3 className="cart-item-title">{item.name}</h3>
                                            
                                            <p className="cart-item-desc">
                                                {item.color ? `Color: ${item.color}` : 'Color estándar'}
                                                {item.size ? ` • Tamaño: ${item.size}` : ''}
                                                {` • Precio unitario: $${(item.listPrice || 0).toFixed(2)}`}
                                            </p>

                                            <div className="cart-item-actions">
                                                <div className="qty-control">
                                                    <button 
                                                        className="qty-btn"
                                                        onClick={() => updateQuantity(item.productId, -1)}
                                                        aria-label="Disminuir cantidad"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="qty-number">{item.quantity}</span>
                                                    <button 
                                                        className="qty-btn"
                                                        onClick={() => updateQuantity(item.productId, 1)}
                                                        aria-label="Aumentar cantidad"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <button 
                                                    className="btn-item-action"
                                                    onClick={() => removeFromCart(item.productId)}
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>

                                        <div style={{ textAlign: 'right', minWidth: '90px' }}>
                                            <span style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>
                                                ${((item.listPrice || 0) * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Columna Derecha: Tarjeta de Resumen estilo Mockup 3 */}
                            <div className="summary-card">
                                <h3 className="summary-title">Resumen del Pedido</h3>
                                <div className="summary-price">
                                    ${cartTotal.toFixed(2)}
                                </div>

                                <ul className="summary-list">
                                    <li className="summary-list-item">
                                        Subtotal ({cartCount} artículos): ${cartTotal.toFixed(2)}
                                    </li>
                                    <li className="summary-list-item">
                                        Envío estimado: Gratis
                                    </li>
                                    <li className="summary-list-item">
                                        Impuestos calculados: $0.00
                                    </li>
                                    <li className="summary-list-item">
                                        Garantía oficial de 30 días
                                    </li>
                                    <li className="summary-list-item">
                                        Transacción encriptada con SSL
                                    </li>
                                </ul>

                                <button 
                                    className="btn-primary-dark"
                                    onClick={handleCheckout}
                                >
                                    Proceder al Pago
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Cart;
