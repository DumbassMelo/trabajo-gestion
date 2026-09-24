import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Ajusta el puerto si es necesario
                const response = await axios.get('https://localhost:7285/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error("Error cargando productos", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <Navbar />
            <div style={{ padding: '20px' }}>
                <h1>Catálogo de Productos</h1>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                    {products.map(product => (
                        <div key={product.productId} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
                            
                            {product.thumbnailPhoto ? (
                                <img 
                                    src={`data:image/gif;base64,${product.thumbnailPhoto}`} 
                                    alt={product.name} 
                                    style={{ maxWidth: '100%', height: '150px', objectFit: 'contain', marginBottom: '10px' }} 
                                />
                            ) : (
                                <div style={{ height: '150px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                                    <span>Sin imagen</span>
                                </div>
                            )}

                            <h3>{product.name}</h3>
                            <p>Color: {product.color || 'N/A'}</p>
                            <h2 style={{ color: '#2ecc71' }}>${product.listPrice.toFixed(2)}</h2>
                            <Link to={`/product/${product.productId}`}>
                                <button style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>Ver Detalle</button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;