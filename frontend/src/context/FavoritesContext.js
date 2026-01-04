import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    // Sayfa yenilense de favoriler gitmesin diye LocalStorage'a kaydediyoruz
    useEffect(() => {
        const savedFavs = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavs);
    }, []);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    // Favoriye ekle çıkar mantığı
    const toggleFavorite = (product) => {
        setFavorites(prev => {
            const isExist = prev.find(item => item.id === product.id);
            if (isExist) {
                return prev.filter(item => item.id !== product.id); // Varsa çıkar
            }
            return [...prev, product]; // Yoksa ekle
        });
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);