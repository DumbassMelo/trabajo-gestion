import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import PlaceholderImage from '../components/PlaceholderImage';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filtros
    const [keywords, setKeywords] = useState(['Spring', 'Smart', 'Modern']);
    const [newKeyword, setNewKeyword] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [maxPrice, setMaxPrice] = useState(3600);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('new'); // 'new', 'price-asc', 'price-desc', 'rating'
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await api.get('/products');
                setProducts(response.data || []);
            } catch (error) {
                console.error("Error cargando productos", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Remover tag de palabra clave
    const handleRemoveKeyword = (keywordToRemove) => {
        setKeywords(keywords.filter(k => k !== keywordToRemove));
    };

    // Agregar nueva palabra clave
    const handleAddKeyword = (e) => {
        e.preventDefault();
        if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
            setKeywords([...keywords, newKeyword.trim()]);
            setNewKeyword('');
        }
    };

    // Toggle para categorías
    const handleToggleCategory = (categoryName) => {
        setSelectedCategories(prev => 
            prev.includes(categoryName)
                ? prev.filter(c => c !== categoryName)
                : [...prev, categoryName]
        );
    };

    // Toggle para colores
    const handleToggleColor = (color) => {
        setSelectedColors(prev => 
            prev.includes(color)
                ? prev.filter(c => c !== color)
                : [...prev, color]
        );
    };

    // Toggle para tamaños
    const handleToggleSize = (size) => {
        setSelectedSizes(prev => 
            prev.includes(size)
                ? prev.filter(s => s !== size)
                : [...prev, size]
        );
    };

    // Categorías disponibles con descripción (como en mockup 1)
    const categoryOptions = [
        { id: 'Road Frames', label: 'Road Frames', desc: 'Cuadros ligeros de alta competencia' },
        { id: 'Mountain Frames', label: 'Mountain Frames', desc: 'Resistencia para todo terreno' },
        { id: 'Road Bikes', label: 'Road Bikes', desc: 'Bicicletas de ruta completas' },
        { id: 'Helmets', label: 'Helmets & Gear', desc: 'Seguridad y accesorios esenciales' },
        { id: 'Jerseys', label: 'Jerseys & Apparel', desc: 'Prendas transpirables para ciclismo' },
    ];

    const colorOptions = ['Black', 'Red', 'Blue', 'Silver', 'White', 'Multi'];
    const sizeOptions = ['42', '48', '54', '58', 'M', 'L', 'XL'];

    // Filtrar y ordenar productos
    const filteredProducts = products.filter(product => {
        // Búsqueda por texto
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            const nameMatch = product.name?.toLowerCase().includes(query);
            const numMatch = product.productNumber?.toLowerCase().includes(query);
            if (!nameMatch && !numMatch) return false;
        }

        // Filtro de precio
        if ((product.listPrice || 0) > maxPrice) {
            return false;
        }

        // Filtro de categorías
        if (selectedCategories.length > 0) {
            if (!selectedCategories.some(cat => product.categoryName?.includes(cat) || product.name?.includes(cat))) {
                return false;
            }
        }

        // Filtro de color
        if (selectedColors.length > 0) {
            if (!selectedColors.includes(product.color)) {
                return false;
            }
        }

        // Filtro de tamaño
        if (selectedSizes.length > 0) {
            if (!selectedSizes.includes(product.size)) {
                return false;
            }
        }

        return true;
    }).sort((a, b) => {
        if (sortBy === 'price-asc') return (a.listPrice || 0) - (b.listPrice || 0);
        if (sortBy === 'price-desc') return (b.listPrice || 0) - (a.listPrice || 0);
        if (sortBy === 'rating') return (a.name || '').localeCompare(b.name || '');
        // Default 'new': por id descendente o normal
        return (b.productId || 0) - (a.productId || 0);
    });

    const activeFiltersCount = selectedCategories.length + selectedColors.length + selectedSizes.length + (maxPrice < 3600 ? 1 : 0);

    const handleClearAllFilters = () => {
        setSelectedCategories([]);
        setSelectedColors([]);
        setSelectedSizes([]);
        setMaxPrice(3600);
        setSearchQuery('');
    };

    return (
        <div>
            <Navbar />

            <main className="page-canvas">
                <div className="white-card">
                    {/* Botón responsive para mostrar filtros en móviles/tablets */}
                    <div className="mobile-filter-bar">
                        <button 
                            type="button"
                            className={`mobile-filter-toggle-btn ${showMobileFilters ? 'active' : ''}`}
                            onClick={() => setShowMobileFilters(!showMobileFilters)}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                            </svg>
                            <span>{showMobileFilters ? 'Ocultar Filtros' : 'Filtros'}</span>
                            {activeFiltersCount > 0 && (
                                <span className="mobile-filter-badge">{activeFiltersCount}</span>
                            )}
                        </button>

                        {activeFiltersCount > 0 && (
                            <button 
                                type="button" 
                                className="clear-filters-btn"
                                onClick={handleClearAllFilters}
                            >
                                Limpiar filtros
                            </button>
                        )}
                    </div>

                    <div className="catalog-layout">
                        {/* Sidebar de Filtros (Mockup 1) con soporte responsive */}
                        <aside className={`filter-sidebar ${showMobileFilters ? 'mobile-visible' : ''}`}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                <span style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280' }}>
                                    FILTROS
                                </span>
                                {activeFiltersCount > 0 && (
                                    <button 
                                        type="button"
                                        onClick={handleClearAllFilters}
                                        style={{ background: 'none', border: 'none', fontSize: '12px', color: '#111827', textDecoration: 'underline', cursor: 'pointer' }}
                                    >
                                        Limpiar
                                    </button>
                                )}
                            </div>
                            {/* Sección Keywords */}
                            <div className="filter-section">
                                <h3 className="filter-title">Keywords</h3>
                                <div className="keywords-container">
                                    {keywords.map(kw => (
                                        <span key={kw} className="keyword-tag">
                                            {kw}
                                            <span 
                                                className="keyword-tag-remove"
                                                onClick={() => handleRemoveKeyword(kw)}
                                            >
                                                &times;
                                            </span>
                                        </span>
                                    ))}
                                </div>
                                <form onSubmit={handleAddKeyword} className="keyword-input-wrapper">
                                    <input 
                                        type="text" 
                                        placeholder="Agregar tag..."
                                        value={newKeyword}
                                        onChange={(e) => setNewKeyword(e.target.value)}
                                        className="keyword-input"
                                    />
                                    <button type="submit" className="keyword-add-btn">+</button>
                                </form>
                            </div>

                            {/* Categorías con Label y Descripción */}
                            <div className="filter-section">
                                {categoryOptions.map(cat => {
                                    const isChecked = selectedCategories.includes(cat.id);
                                    return (
                                        <div 
                                            key={cat.id} 
                                            className={`checkbox-item ${isChecked ? 'checked' : ''}`}
                                            onClick={() => handleToggleCategory(cat.id)}
                                        >
                                            <div className="custom-checkbox">
                                                {isChecked && (
                                                    <svg viewBox="0 0 24 24" fill="none">
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                )}
                                            </div>
                                            <div className="checkbox-labels">
                                                <span className="checkbox-label-text">{cat.label}</span>
                                                <span className="checkbox-desc-text">{cat.desc}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Slider de Precio */}
                            <div className="filter-section">
                                <div className="price-slider-header">
                                    <span className="price-slider-label">Label</span>
                                    <span className="price-slider-value">$0 - {maxPrice}</span>
                                </div>
                                <div className="slider-track-container">
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="3600" 
                                        step="50"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                                        className="range-input"
                                    />
                                </div>
                            </div>

                            {/* Color Checkboxes */}
                            <div className="filter-section">
                                <h3 className="filter-title">Color</h3>
                                {colorOptions.map(color => {
                                    const isChecked = selectedColors.includes(color);
                                    return (
                                        <div 
                                            key={color} 
                                            className={`checkbox-item ${isChecked ? 'checked' : ''}`}
                                            onClick={() => handleToggleColor(color)}
                                        >
                                            <div className="custom-checkbox">
                                                {isChecked && (
                                                    <svg viewBox="0 0 24 24" fill="none">
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                )}
                                            </div>
                                            <span className="checkbox-label-text">{color}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Size Checkboxes */}
                            <div className="filter-section">
                                <h3 className="filter-title">Size</h3>
                                {sizeOptions.map(size => {
                                    const isChecked = selectedSizes.includes(size);
                                    return (
                                        <div 
                                            key={size} 
                                            className={`checkbox-item ${isChecked ? 'checked' : ''}`}
                                            onClick={() => handleToggleSize(size)}
                                        >
                                            <div className="custom-checkbox">
                                                {isChecked && (
                                                    <svg viewBox="0 0 24 24" fill="none">
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                )}
                                            </div>
                                            <span className="checkbox-label-text">{size}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </aside>

                        {/* Área Principal de Productos */}
                        <div className="catalog-content">
                            {/* Toolbar superior: Buscador y Pills de ordenamiento */}
                            <div className="catalog-toolbar">
                                <div className="search-input-box">
                                    <input 
                                        type="text" 
                                        placeholder="Search" 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    </svg>
                                </div>

                                <div className="sort-pills-group">
                                    <button 
                                        className={`sort-pill ${sortBy === 'new' ? 'active' : ''}`}
                                        onClick={() => setSortBy('new')}
                                    >
                                        {sortBy === 'new' && <span>&#10003;</span>} New
                                    </button>
                                    <button 
                                        className={`sort-pill ${sortBy === 'price-asc' ? 'active' : ''}`}
                                        onClick={() => setSortBy('price-asc')}
                                    >
                                        {sortBy === 'price-asc' && <span>&#10003;</span>} Price ascending
                                    </button>
                                    <button 
                                        className={`sort-pill ${sortBy === 'price-desc' ? 'active' : ''}`}
                                        onClick={() => setSortBy('price-desc')}
                                    >
                                        {sortBy === 'price-desc' && <span>&#10003;</span>} Price descending
                                    </button>
                                    <button 
                                        className={`sort-pill ${sortBy === 'rating' ? 'active' : ''}`}
                                        onClick={() => setSortBy('rating')}
                                    >
                                        {sortBy === 'rating' && <span>&#10003;</span>} Rating
                                    </button>
                                </div>
                            </div>

                            {/* Grid de Productos como en la imagen 1 */}
                            {loading ? (
                                <div style={{ textAlign: 'center', padding: '60px 0', color: '#6b7280' }}>
                                    Cargando catálogo de productos...
                                </div>
                            ) : filteredProducts.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '60px 0', color: '#6b7280' }}>
                                    No se encontraron productos que coincidan con los filtros seleccionados.
                                </div>
                            ) : (
                                <div className="product-grid">
                                    {filteredProducts.map(product => (
                                        <Link 
                                            key={product.productId} 
                                            to={`/product/${product.productId}`}
                                            className="product-card"
                                        >
                                            <div className="product-image-container">
                                                {product.thumbnailPhoto ? (
                                                    <img 
                                                        src={`data:image/gif;base64,${product.thumbnailPhoto}`} 
                                                        alt={product.name} 
                                                        className="product-image"
                                                    />
                                                ) : (
                                                    <PlaceholderImage />
                                                )}
                                            </div>

                                            <div className="product-info">
                                                <h4 className="product-title" title={product.name}>
                                                    {product.name}
                                                </h4>
                                                <div className="product-price">
                                                    ${(product.listPrice || 0).toFixed(0)}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;