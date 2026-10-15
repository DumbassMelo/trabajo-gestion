import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import PlaceholderImage from '../components/PlaceholderImage';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [isAccordionOpen, setIsAccordionOpen] = useState(true);

    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
                setSelectedColor(response.data.color || 'Estándar');
                setSelectedSize(response.data.size || 'Único');
            } catch (err) {
                console.error("Error cargando el detalle", err);
                setError('No se pudo cargar la información del producto.');
            } finally {
                setLoading(false);
            }
        };
        fetchProductDetail();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product, 1, {
            color: selectedColor,
            size: selectedSize
        });
    };

    return (
        <div>
            <Navbar />

            <main className="page-canvas">
                <div className="white-card">
                    <Link to="/" className="back-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                        Volver al catálogo
                    </Link>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '80px 20px', color: '#6b7280' }}>
                            Cargando información del producto...
                        </div>
                    ) : error || !product ? (
                        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                            <p style={{ color: '#ef4444', marginBottom: '16px' }}>{error || 'Producto no encontrado.'}</p>
                            <Link to="/" className="btn-primary-dark" style={{ display: 'inline-flex', width: 'auto', padding: '10px 24px' }}>
                                Ir a la tienda
                            </Link>
                        </div>
                    ) : (
                        <div className="detail-container">
                            {/* Columna Izquierda: Imagen grande con botón flotante de corazón */}
                            <div className="detail-image-box">
                                <button 
                                    className={`wishlist-btn ${isFavorite ? 'active' : ''}`}
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    title={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
                                    aria-label="Favorito"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill={isFavorite ? "#ffffff" : "none"} stroke="#ffffff" strokeWidth="2">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                    </svg>
                                </button>

                                {product.thumbnailPhoto ? (
                                    <img 
                                        src={`data:image/gif;base64,${product.thumbnailPhoto}`} 
                                        alt={product.name} 
                                        className="detail-image"
                                    />
                                ) : (
                                    <PlaceholderImage />
                                )}
                            </div>

                            {/* Columna Derecha: Título, Tag, Precio, Selectores, Botón y Acordeón */}
                            <div className="detail-info-col">
                                <h1 className="detail-heading">{product.name}</h1>

                                <div>
                                    <span className="detail-tag">
                                        {product.categoryName || 'En Stock'}
                                    </span>
                                </div>

                                <div className="detail-price">
                                    ${(product.listPrice || 0).toFixed(2)}
                                </div>

                                <p className="detail-desc">
                                    {product.description || 'Diseñado con materiales de la más alta calidad para asegurar un rendimiento óptimo, durabilidad excepcional y una experiencia de usuario superior en todo momento.'}
                                </p>

                                {/* Selectores lado a lado como en la imagen 2 */}
                                <div className="detail-selectors-row">
                                    <div className="selector-group">
                                        <label className="selector-label">Color</label>
                                        <select 
                                            className="selector-select"
                                            value={selectedColor}
                                            onChange={(e) => setSelectedColor(e.target.value)}
                                        >
                                            <option value={product.color || 'Original'}>
                                                {product.color || 'Original'}
                                            </option>
                                            {product.color !== 'Negro' && <option value="Negro">Negro</option>}
                                            {product.color !== 'Plata' && <option value="Plata">Plata</option>}
                                            {product.color !== 'Rojo' && <option value="Rojo">Rojo</option>}
                                        </select>
                                    </div>

                                    <div className="selector-group">
                                        <label className="selector-label">Tamaño / Versión</label>
                                        <select 
                                            className="selector-select"
                                            value={selectedSize}
                                            onChange={(e) => setSelectedSize(e.target.value)}
                                        >
                                            <option value={product.size || 'Estándar'}>
                                                {product.size ? `Talla ${product.size}` : 'Estándar'}
                                            </option>
                                            {product.size !== '48' && <option value="48">Talla 48</option>}
                                            {product.size !== '52' && <option value="52">Talla 52</option>}
                                            {product.size !== '58' && <option value="58">Talla 58</option>}
                                        </select>
                                    </div>
                                </div>

                                {/* Botón principal oscuro para agregar al carrito */}
                                <button 
                                    className="btn-primary-dark"
                                    onClick={handleAddToCart}
                                >
                                    Agregar al Carrito
                                </button>

                                {/* Acordeón con chevron como en la imagen 2 */}
                                <div className="accordion-box">
                                    <div 
                                        className="accordion-header"
                                        onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                                    >
                                        <span className="accordion-title">Especificaciones y Preguntas Frecuentes</span>
                                        <svg 
                                            className={`accordion-icon ${isAccordionOpen ? 'open' : ''}`}
                                            viewBox="0 0 24 24" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            strokeWidth="2" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round"
                                        >
                                            <polyline points="18 15 12 9 6 15"></polyline>
                                        </svg>
                                    </div>

                                    {isAccordionOpen && (
                                        <div className="accordion-content">
                                            <p style={{ marginBottom: '8px' }}>
                                                <strong>Código de Producto:</strong> {product.productNumber || 'N/A'}
                                            </p>
                                            {product.modelName && (
                                                <p style={{ marginBottom: '8px' }}>
                                                    <strong>Modelo:</strong> {product.modelName}
                                                </p>
                                            )}
                                            {product.weight && (
                                                <p style={{ marginBottom: '8px' }}>
                                                    <strong>Peso estimado:</strong> {product.weight} lb
                                                </p>
                                            )}
                                            <p style={{ marginTop: '8px' }}>
                                                <strong>Garantía y Envíos:</strong> Este artículo cuenta con envío seguro garantizado y 30 días para cambio o devolución sin costo adicional en su empaque original.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ProductDetail;