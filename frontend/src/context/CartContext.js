import React, { createContext, useContext, useState, useEffect } from "react";

// Sepet verisini uygulama genelinde paylaşmak için context
const CartContext = createContext();

export function CartProvider({ children }) {
    // Sepet state'i, ilk açılışta localStorage'dan yüklenir
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    // Sepet her değiştiğinde localStorage güncellenir
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    // Sepeti tamamen temizler (Sipariş tamamlandığında)
    const clearCart = () => {
        setCartItems([]); // Ekrandaki sepeti sıfırlar
        localStorage.removeItem("cart"); // Tarayıcı hafızasını temizler
    };

    // Ürünü sepete ekler veya miktarını artırır
    const addToCart = (product) => {
        setCartItems((prev) => {
            const existing = prev.find(item => item.id === product.id);
            const fixedPrice = Number(product.price) || 0;

            if (existing) {
                // Ürün varsa sadece quantity artırılır
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: (item.quantity || 1) + 1, price: fixedPrice }
                        : item
                );
            }
            // Ürün yoksa yeni ürün olarak eklenir
            return [...prev, { ...product, quantity: 1, price: fixedPrice }];
        });
    };

    // Ürün miktarını azaltır, 1 olursa sepetten çıkarır
    const decreaseQuantity = (id) => {
        setCartItems((prev) => {
            const item = prev.find(i => i.id === id);
            if (item && item.quantity > 1) {
                return prev.map(i =>
                    i.id === id ? { ...i, quantity: i.quantity - 1 } : i
                );
            }
            return prev.filter(i => i.id !== id);
        });
    };

    // Ürünü tamamen sepetten siler
    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        // Sepet fonksiyonları tüm uygulamaya sağlanır
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, decreaseQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

// CartContext'e güvenli erişim için custom hook
export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within CartProvider.!");
    }
    return context;
}
