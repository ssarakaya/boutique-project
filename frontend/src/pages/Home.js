import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Container, Grid, Button, Fade, Chip, Stack, Skeleton, Paper, Avatar, Rating } from "@mui/material";
import { keyframes } from '@mui/system'; // Kayan yazı animasyonu için eklendi
import ProductCard from "../components/ProductCard";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

// --- KAYAN YORUMLAR İÇİN ANİMASYON VE VERİLER ---
const scrollAnim = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const clientReviews = [
    { id: 1, name: "Selin Y.", text: "Butik tasarımları tek kelimeyle harika! 😍", rating: 5 },
    { id: 2, name: "Caner T.", text: "Kumaş kalitesi beklentimin çok üzerinde. Teşekkürler!", rating: 5 },
    { id: 3, name: "Merve A.", text: "Ürünler tam göründüğü gibi geliyor. Çok şık bir koleksiyon.", rating: 4 },
    { id: 4, name: "Deniz B.", text: "Hızlı kargo ve özenli paketleme için teşekkürler.", rating: 5 },
    { id: 5, name: "Elif K.", text: "Kesinlikle tavsiye ediyorum, harika parçalar.", rating: 5 },
    { id: 6, name: "Hakan S.", text: "Kalıpları tam, dokusu yumuşacık ve kaliteli.", rating: 5 }
];

const duplicatedReviews = [...clientReviews, ...clientReviews];

function Home({ mainCategory, subCategory }) {
    // Ürün listesi ve sayfa yükleme durumu için state tanımlamaları
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Navigasyon ve URL konum bilgisini yönetmek için hook'lar
    const location = useLocation();
    const navigate = useNavigate();

    // Sayfa yüklendiğinde backend API'den ürün verilerini çeker
    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:8081/api/products") // Backend portu 8081 olarak ayarlandı
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) setProducts(data);
                else setProducts([]);
                setLoading(false); // Yükleme tamamlandı
            })
            .catch((err) => {
                console.error("Fetch error:", err);
                setProducts([]);
                setLoading(false);
            });
    }, []);

    // Hero alanındaki buton için kullanılan özel stil tanımlaması
    const pinkButtonStyle = {
        backgroundColor: "#f7d1d1",
        color: "#1a1a1a",
        px: 7,
        py: 2.5,
        borderRadius: "50px",
        fontSize: "0.85rem",
        fontWeight: 900,
        textTransform: "uppercase",
        letterSpacing: 3,
        boxShadow: "0 15px 35px rgba(247, 209, 209, 0.5)",
        transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "&:hover": {
            backgroundColor: "#1a1a1a",
            color: "#fff",
            transform: "translateY(-8px) scale(1.03)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
        }
    };

    // URL'deki arama parametresini yakalar
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('search')?.toLowerCase() || "";

    // Ürünleri arama terimine, ana ve alt kategoriye göre filtreler
    const filteredProducts = products.filter((p) => {
        const nameMatch = p.name.toLowerCase().includes(searchTerm);
        const subCatMatch = (p.subCategory || p.sub_category || "").toLowerCase().includes(searchTerm);
        const matchesSearch = nameMatch || subCatMatch;

        // Alt kategori bazlı filtreleme
        if (subCategory) return (p.subCategory || p.sub_category) === subCategory && matchesSearch;

        // Ana kategori bazlı filtreleme (isimlendirme farklılıklarını yönetir)
        if (mainCategory) {
            const pCategory = (p.mainCategory || p.main_category || "").toLowerCase();
            return pCategory === mainCategory.toLowerCase() && matchesSearch;
        }
        return matchesSearch;
    });

    // Ana sayfada gösterilecek özel ürün grupları
    const newCollection = products.slice(-6).reverse(); // Yeni koleksiyon
    const discountedProducts = products.filter((p) => p.price < 1200).slice(0, 6); // Fiyatı 1200 altı ürünler

    return (
        <Fade in={true} timeout={1200}>
            <Box sx={{ backgroundColor: "#fdfcfa" }}>

                {/* En üstteki siyah duyuru bandı */}
                <Box sx={{
                    backgroundColor: "#1a1a1a", color: "#fff", py: 1, textAlign: "center",
                    fontSize: "0.7rem", fontWeight: 800, letterSpacing: 3,
                    display: "flex", justifyContent: "center", alignItems: "center", gap: 2
                }}>
                    <LocalShippingIcon sx={{ fontSize: 16, color: "#f7d1d1" }} />
                    FREE DELIVERY • ORDERS OVER 1000 TL <span style={{ color: "#f7d1d1" }}> FREE SHIPPING</span>
                </Box>

                {/* Filtreleme yoksa gösterilen giriş (Hero) alanı */}
                {!mainCategory && !subCategory && !searchTerm && (
                    <Box
                        sx={{
                            minHeight: "95vh", display: "flex", alignItems: "center",
                            position: "relative", overflow: "hidden",
                            background: "linear-gradient(135deg, #fdfcfa 0%, #f9ecec 100%)",
                        }}
                    >
                        {/* Arka plandaki dekoratif COLLECTION yazısı */}
                        <Typography
                            sx={{
                                position: "absolute", bottom: "-5%", right: "-2%",
                                fontSize: "18rem", fontWeight: 950,
                                color: "rgba(26, 26, 26, 0.02)", // Daha soft renk tonu
                                zIndex: 0, userSelect: "none", lineHeight: 1,
                                letterSpacing: "0.1em", textTransform: 'uppercase'
                            }}
                        >
                            COLLECTION
                        </Typography>

                        <Container sx={{ position: "relative", zIndex: 1 }}>
                            <Grid container alignItems="center" spacing={10}>
                                {/* Sol taraf: Başlıklar ve buton */}
                                <Grid item xs={12} md={5}>
                                    <Stack spacing={4}>
                                        <Stack direction="row" alignItems="center" spacing={2}>
                                            <Box sx={{ width: 40, height: 1, bgcolor: "#d9644a" }} />
                                            <Typography variant="overline" sx={{ fontWeight: 900, letterSpacing: 5, color: "#d9644a" }}>
                                                WINTER '26 SPECIAL
                                            </Typography>
                                        </Stack>

                                        <Typography variant="h1" sx={{
                                            fontWeight: 900, color: "#1a1a1a",
                                            fontSize: { xs: "3.5rem", md: "6rem" },
                                            lineHeight: 0.85, letterSpacing: "-0.03em"
                                        }}>
                                            ELEGANCE <br />
                                            <span style={{
                                                color: "#d9644a", fontStyle: "italic",
                                                fontWeight: 200, fontFamily: "serif"
                                            }}>Explore.</span>
                                        </Typography>

                                        <Typography sx={{ fontSize: "1.15rem", color: "#666", maxWidth: 420, lineHeight: 1.9, fontWeight: 300 }}>
                                            Introducing our new collection: Timeless silhouettes redefined with a modern twist.
                                        </Typography>

                                        <Box>
                                            <Button
                                                variant="contained"
                                                onClick={() => window.scrollTo({ top: 900, behavior: 'smooth' })}
                                                sx={pinkButtonStyle}
                                            >
                                                START EXPLORE
                                            </Button>
                                        </Box>
                                    </Stack>
                                </Grid>

                                {/* Sağ taraf: Hero görseli ve overlay katmanları */}
                                <Grid item xs={12} md={7}>
                                    <Box sx={{ position: "relative", textAlign: "right" }}>
                                        {/* Dekoratif dış çerçeve */}
                                        <Box sx={{
                                            position: "absolute", top: -30, left: "10%", width: "85%", height: "105%",
                                            border: "1px solid rgba(217, 100, 74, 0.3)", borderRadius: "100px 30px 100px 30px", zIndex: 0
                                        }} />

                                        {/* Ana görsel ve karartma katmanı */}
                                        <Box sx={{ position: 'relative', display: 'inline-block', width: '90%', zIndex: 1 }}>
                                            <Box
                                                component="img"
                                                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070"
                                                sx={{
                                                    width: '100%', height: '700px', objectFit: 'cover',
                                                    borderRadius: "100px 30px 100px 30px",
                                                    boxShadow: "40px 40px 80px rgba(0,0,0,0.15)"
                                                }}
                                            />
                                            {/* Yumuşak gradient katmanı */}
                                            <Box sx={{
                                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                                borderRadius: "100px 30px 100px 30px",
                                                background: 'linear-gradient(45deg, rgba(0,0,0,0.1) 0%, transparent 100%)',
                                                pointerEvents: 'none'
                                            }} />
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                )}

                {/* Ürün listeleme alanı */}
                <Container sx={{ mt: searchTerm ? 5 : 20, pb: 15 }}>
                    {searchTerm ? (
                        <Section title={`"${searchTerm}" Results`} products={filteredProducts} navigate={navigate} loading={loading} />
                    ) : (
                        (mainCategory || subCategory) ? (
                            <Section title={subCategory || mainCategory} products={filteredProducts} navigate={navigate} loading={loading} />
                        ) : (
                            <>
                                {/* Vitrin bölümleri */}
                                <Section title="NEW COLLECTİONS" products={newCollection} badge="NEW" navigate={navigate} loading={loading} />

                                {/* --- KAYAN YORUMLAR BÖLÜMÜ (BURAYA EKLENDİ) --- */}
                                <Box sx={{ my: 15, overflow: 'hidden', py: 5 }}>
                                    <Typography variant="h3" textAlign="center" sx={{ mb: 8, fontWeight: 900, letterSpacing: -1 }}>
                                        WHAT OUR <span style={{ color: "#d9644a" }}>CLIENTS SAY</span>
                                    </Typography>
                                    <Box sx={{
                                        display: 'flex',
                                        width: 'max-content',
                                        animation: `${scrollAnim} 45s linear infinite`,
                                        '&:hover': { animationPlayState: 'paused' }
                                    }}>
                                        {duplicatedReviews.map((review, index) => (
                                            <Paper key={index} elevation={0} sx={{ p: 4, mx: 3, borderRadius: '35px', border: '1px solid #f0f0f0', minWidth: '350px', bgcolor: '#fff', boxShadow: '0 10px 40px rgba(0,0,0,0.02)' }}>
                                                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                                                    <Avatar sx={{ bgcolor: '#f7d1d1', color: '#1a1a1a', fontWeight: 800 }}>{review.name[0]}</Avatar>
                                                    <Box>
                                                        <Typography sx={{ fontWeight: 800, fontSize: '0.95rem' }}>{review.name}</Typography>
                                                        <Rating value={review.rating} size="small" readOnly />
                                                    </Box>
                                                </Stack>
                                                <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#666', lineHeight: 1.7, fontSize: '0.95rem' }}>"{review.text}"</Typography>
                                            </Paper>
                                        ))}
                                    </Box>
                                </Box>

                                {/* Siyah kampanya banner'ı */}
                                <Box sx={{
                                    my: 25, py: 15, backgroundColor: "#1a1a1a", borderRadius: "40px",
                                    color: "#fff", textAlign: "center", position: "relative", overflow: "hidden",
                                    boxShadow: "0 30px 70px rgba(0,0,0,0.2)"
                                }}>
                                    <Box sx={{
                                        position: "absolute", top: "-20%", right: "-10%", width: 400, height: 400,
                                        borderRadius: "50%", background: "radial-gradient(circle, rgba(217,100,74,0.15) 0%, transparent 70%)"
                                    }} />

                                    <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, letterSpacing: -2 }}>
                                        FLAWLESS <span style={{ color: "#f7d1d1" }}>EXPERIENCE</span>
                                    </Typography>
                                    <Typography variant="h6" sx={{ opacity: 0.6, mb: 6, fontWeight: 300, letterSpacing: 5 }}>
                                        NOW WITH FREE SHIPPING!
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        onClick={() => navigate('/login')}
                                        sx={{
                                            borderColor: "#f7d1d1", color: "#f7d1d1", borderRadius: "0",
                                            px: 8, py: 2, borderWidth: "2px", fontWeight: 900, letterSpacing: 4,
                                            "&:hover": { borderColor: "#fff", color: "#fff", borderWidth: "2px" }
                                        }}
                                    >
                                        SIGN UP AND EXPLORE
                                    </Button>
                                </Box>

                                <Section title="Favorites of The Week" products={discountedProducts} badge="TREND" navigate={navigate} loading={loading} />
                            </>
                        )
                    )}
                </Container>
            </Box>
        </Fade>
    );
}

// Ürün gruplarını listeleyen fonksiyonel bileşen
function Section({ title, products, badge, navigate, loading }) {
    return (
        <Box sx={{ mb: 18 }}>

            {/* Bölüm başlığı ve rozet alanı */}
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 8 }}>
                <Box>
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                        <Typography variant="h3" sx={{ fontWeight: 900, color: "#1a1a1a", letterSpacing: -1, fontSize: "2.8rem" }}>
                            {title}
                        </Typography>
                        {badge && (
                            <Chip
                                label={badge} size="small"
                                sx={{ bgcolor: "#d9644a", color: "#fff", fontWeight: 900, borderRadius: "4px" }}
                            />
                        )}
                    </Stack>
                    <Box sx={{ width: 60, height: 4, bgcolor: "#f7d1d1" }} />
                </Box>

                <Button
                    variant="text"
                    sx={{ color: "#1a1a1a", fontWeight: 800, letterSpacing: 2, "&:hover": { color: "#d9644a" } }}
                >
                    See All
                </Button>
            </Stack>

            <Grid container spacing={6}>
                {loading ? (
                    // Yükleme sırasında gösterilen hayalet (skeleton) kutular
                    [...Array(3)].map((_, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: "30px", mb: 2 }} />
                            <Skeleton variant="text" width="60%" height={30} />
                            <Skeleton variant="text" width="40%" />
                        </Grid>
                    ))
                ) : products.length === 0 ? (
                    <Grid item xs={12}>
                        <Typography color="text.secondary">Product not found.</Typography>
                    </Grid>
                ) : (
                    // Ürün kartlarını listeleyen döngü
                    products.map((p, index) => (
                        <Grid item xs={12} sm={6} md={4} key={p.id}>
                            <Fade in={true} style={{ transitionDelay: `${index * 150}ms` }}>
                                <Box
                                    onClick={() => navigate(`/product/${p.id}`)}
                                    sx={{ cursor: "pointer" }}
                                >
                                    <ProductCard product={p} />
                                </Box>
                            </Fade>
                        </Grid>
                    ))
                )}
            </Grid>
        </Box>
    );
}

export default Home;