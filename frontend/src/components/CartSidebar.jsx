import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import PlaceholderImage from './PlaceholderImage';

const CartSidebar = () => {
    const { isCartOpen, closeCart, lastAddedItem, cartTotal, cartCount } = useContext(CartContext);
    const navigate = useNavigate();

    if (!isCartOpen) return null;

    const handleGoToCart = () => {
        closeCart();
        navigate('/cart');
    };

    return (
        <div className="cart-sidebar-backdrop" onClick={closeCart}>
            <div className="cart-sidebar-container" onClick={(e) => e.stopPropagation()}>
                {/* Header estilo Amazon con confirmación */}
                <div className="drawer-header">
                    <div className="drawer-title-row">
                        <svg className="drawer-success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span className="drawer-title">Agregado al carrito</span>
                    </div>
                    <button className="drawer-close-btn" onClick={closeCart} aria-label="Cerrar">
                        &times;
                    </button>
                </div>

                <div className="drawer-body">
                    {/* Vista previa del producto recién agregado */}
                    {lastAddedItem ? (
                        <div className="added-item-preview">
                            <div className="added-item-thumb">
                                {lastAddedItem.thumbnailPhoto ? (
                                    <img 
                                        src={`data:image/gif;base64,${lastAddedItem.thumbnailPhoto}`} 
                                        alt={lastAddedItem.name} 
                                    />
                                ) : (
                                    <PlaceholderImage />
                                )}
                            </div>
                            <div className="added-item-details">
                                <h4 className="added-item-name">{lastAddedItem.name}</h4>
                                {(lastAddedItem.color || lastAddedItem.size) && (
                                    <p style={{ fontSize: '12px', color: '#6b7280', margin: '2px 0 6px 0' }}>
                                        {lastAddedItem.color ? `Color: ${lastAddedItem.color}` : ''}
                                        {lastAddedItem.color && lastAddedItem.size ? ' | ' : ''}
                                        {lastAddedItem.size ? `Tamaño: ${lastAddedItem.size}` : ''}
                                    </p>
                                )}
                                <div className="added-item-price">
                                    ${(lastAddedItem.listPrice || 0).toFixed(2)}
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {/* Resumen del Subtotal */}
                    <div className="drawer-subtotal-box">
                        <div className="drawer-subtotal-text">
                            Subtotal del carrito ({cartCount} {cartCount === 1 ? 'artículo' : 'artículos'}):
                        </div>
                        <div className="drawer-subtotal-amount">
                            ${cartTotal.toFixed(2)}
                        </div>
                    </div>

                    {/* Acciones principales */}
                    <div className="drawer-actions">
                        <button className="btn-primary-dark" onClick={handleGoToCart}>
                            Ir al Carrito
                        </button>
                        <button className="btn-secondary-outline" onClick={handleGoToCart}>
                            Proceder al Pago
                        </button>
                        <button 
                            onClick={closeCart}
                            style={{ 
                                background: 'none', 
                                border: 'none', 
                                color: '#4b5563', 
                                fontSize: '13px', 
                                cursor: 'pointer',
                                marginTop: '4px',
                                textDecoration: 'underline'
                            }}
                        >
                            Seguir comprando
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartSidebar;