import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error cargando el detalle", error);
            }
        };
        fetchProductDetail();
    }, [id]);

    if (!product) return <p style={{ padding: '20px' }}>Cargando producto...</p>;

    return (
        <div>
            <Navbar />
            <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
                <Link to="/">← Volver al catálogo</Link>
                
                <div style={{ display: 'flex', gap: '30px', marginTop: '20px', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1', minWidth: '250px' }}>
                        {product.thumbnailPhoto ? (
                            <img 
                                src={`data:image/gif;base64,${product.thumbnailPhoto}`} 
                                alt={product.name} 
                                style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} 
                            />
                        ) : (
                            <div style={{ width: '100%', height: '300px', backgroundColor: '#eee', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                No hay imagen disponible
                            </div>
                        )}
                    </div>

                    <div style={{ flex: '2', minWidth: '300px' }}>
                        <h1>{product.name}</h1>
                        <h4 style={{ color: '#7f8c8d', marginTop: '0' }}>
                            Categoría: {product.categoryName} | Modelo: {product.modelName}
                        </h4>
                        
                        <p style={{ fontStyle: 'italic', marginBottom: '20px' }}>
                            {product.description}
                        </p>

                        <p><strong>Código:</strong> {product.productNumber}</p>
                        <p><strong>Color:</strong> {product.color || 'No especificado'}</p>
                        <p><strong>Tamaño:</strong> {product.size || 'No especificado'}</p>
                        <p><strong>Peso:</strong> {product.weight ? `${product.weight} lb` : 'No especificado'}</p>
                        
                        <h2 style={{ color: '#2ecc71', fontSize: '2em', margin: '10px 0' }}>
                            ${product.listPrice.toFixed(2)}
                        </h2>
                        
                        <button style={{ padding: '15px 30px', fontSize: '1.1em', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}>
                            Agregar al Carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;