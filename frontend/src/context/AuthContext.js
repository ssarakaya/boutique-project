import React, { createContext, useState, useContext, useEffect } from 'react';

// Kullanıcı bilgilerini global olarak tutmak için context oluşturulur
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Giriş yapan kullanıcı bilgisi
    const [user, setUser] = useState(null);

    // Sayfa yenilendiğinde localStorage'dan kullanıcıyı geri yükler
    useEffect(() => {
        const storedUser = localStorage.getItem('loggedUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Kullanıcı giriş yaptığında state ve localStorage güncellenir
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('loggedUser', JSON.stringify(userData));
    };

    // Kullanıcı çıkış yaptığında bilgiler temizlenir
    const logout = () => {
        setUser(null);
        localStorage.removeItem('loggedUser');
    };

    // Auth bilgileri tüm uygulamaya sağlanır
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// AuthContext'e kolay erişim için custom hook
export const useAuth = () => useContext(AuthContext);
