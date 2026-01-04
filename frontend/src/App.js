import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import CategoryDrawer from "./components/CategoryDrawer";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import FavoritesPage from "./pages/FavoritesPage"; // Yeni yaptığımız favoriler sayfası
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext"; // Favori hafızasını buraya ekledik

function App() {
    const [mainCategory, setMainCategory] = useState(null);
    const [subCategory, setSubCategory] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleMainCategoryChange = (category) => {
        setMainCategory(category);
        setSubCategory(null);
    };

    return (
        // Projeyi sarmalayan sağlayıcılar (Contextler)
        <AuthProvider>
            {/* Favoriler butün sitede çalışsın diye buraya koydum */}
            <FavoritesProvider>
                <CartProvider>
                    <BrowserRouter>
                        <Navbar
                            mainCategory={mainCategory}
                            setMainCategory={setMainCategory}
                            setSubCategory={setSubCategory}
                            onMenuClick={() => setDrawerOpen(true)}
                        />

                        <CategoryDrawer
                            open={drawerOpen}
                            onClose={() => setDrawerOpen(false)}
                            setMainCategory={handleMainCategoryChange}
                            setSubCategory={setSubCategory}
                        />

                        {/* Sayfa yönlendirmelerimiz burada */}
                        <Routes>
                            <Route path="/" element={<Home mainCategory={mainCategory} subCategory={subCategory} />} />
                            <Route path="/product/:id" element={<ProductDetail />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/favorites" element={<FavoritesPage />} /> {/* Favoriler sayfası yolu */}
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/checkout" element={<CheckoutPage />} />
                            <Route path="/orders" element={<OrdersPage />} />
                        </Routes>

                        <Footer />
                    </BrowserRouter>
                </CartProvider>
            </FavoritesProvider>
        </AuthProvider>
    );
}

export default App;