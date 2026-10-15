import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Inicializar el carrito desde LocalStorage o como arreglo vacío
    const [cart, setCart] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch {
            return [];
        }
    });

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [lastAddedItem, setLastAddedItem] = useState(null);

    // Guardar en LocalStorage cada vez que el carrito cambie
    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cart));
        } catch (error) {
            console.error('Error saving cart to localStorage', error);
        }
    }, [cart]);

    const addToCart = (product, quantity = 1, selectedOptions = {}) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.productId === product.productId);
            if (existingItem) {
                return prevCart.map(item =>
                    item.productId === product.productId
                        ? { ...item, quantity: item.quantity + quantity, ...selectedOptions }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity, ...selectedOptions }];
        });

        setLastAddedItem({ ...product, quantityAdded: quantity, ...selectedOptions });
        setIsCartOpen(true); // Abre el sidebar tipo Amazon SOLO al agregar producto
    };

    const updateQuantity = (productId, amount) => {
        setCart(prevCart => prevCart.map(item => {
            if (item.productId === productId) {
                const newQuantity = item.quantity + amount;
                return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
            }
            return item;
        }));
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.productId !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);
    const toggleCart = () => setIsCartOpen(prev => !prev);

    const cartTotal = cart.reduce((total, item) => total + ((item.listPrice || 0) * item.quantity), 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart,
            lastAddedItem,
            addToCart,
            updateQuantity,
            removeFromCart,
            clearCart,
            isCartOpen,
            openCart,
            closeCart,
            toggleCart,
            cartTotal,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};