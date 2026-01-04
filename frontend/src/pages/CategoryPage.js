import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Typography, Box, Fade, Skeleton } from "@mui/material"; // Skeleton ve Fade eklendi
import ProductCard from "../components/ProductCard";

function CategoryPage() {
    // URL'den gelen kategori parametresi
    const { mainCategory } = useParams();

    // Ürünleri ve yüklenme durumunu tutan state'ler
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Kategori her değiştiğinde backend'den verileri çek
    useEffect(() => {
        setLoading(true); // Yeni kategoriye geçince yükleniyor animasyonunu başlat

        // Backend portunu 8081 olarak güncelledik
        axios
            .get(`http://localhost:8081/api/products/category/${mainCategory}`)
            .then((res) => {
                setProducts(res.data);
                setLoading(false); // Veri gelince yüklemeyi bitir
            })
            .catch((err) => {
                console.error("Category data could not be retrieved.:", err);
                setLoading(false);
            });
    }, [mainCategory]);

    // Kategori ismini daha şık yazdırmak için formatlama fonksiyonu (örn: ust_giyim -> ÜST GİYİM)
    const formatTitle = (text) => {
        if (!text) return "";
        return text.replace("_", " ").toUpperCase();
    };

    return (
        <Fade in={true} timeout={800}>
            <Container sx={{ mt: 15, mb: 10 }}> {/* Navbar'ın altında kalmaması için mt artırıldı */}

                {/* Kategori Başlığı ve Alt Çizgisi */}
                <Box sx={{ mb: 6 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 900,
                            fontFamily: 'serif',
                            letterSpacing: -1,
                            color: '#1a1a1a'
                        }}
                    >
                        {formatTitle(mainCategory)}
                    </Typography>
                    <Box sx={{ width: 60, height: 4, bgcolor: "#d9644a", mt: 1 }} />
                </Box>

                <Grid container spacing={4}>
                    {loading ? (
                        // Veri yüklenirken gösterilecek "Hayalet" (Skeleton) kartlar
                        [...Array(6)].map((_, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Skeleton variant="rectangular" height={400} sx={{ borderRadius: "30px", mb: 2 }} />
                                <Skeleton variant="text" width="60%" height={30} />
                                <Skeleton variant="text" width="40%" />
                            </Grid>
                        ))
                    ) : products.length === 0 ? (
                        // Eğer bu kategoride ürün yoksa gösterilecek mesaj
                        <Grid item xs={12}>
                            <Box sx={{ textAlign: 'center', py: 10 }}>
                                <Typography variant="h6" color="text.secondary">
                                    There are no products in this category yet.
                                </Typography>
                            </Box>
                        </Grid>
                    ) : (
                        // Ürünler başarıyla geldiyse listele
                        products.map((p) => (
                            <Grid item xs={12} sm={6} md={4} key={p.id}>
                                <ProductCard product={p} />
                            </Grid>
                        ))
                    )}
                </Grid>
            </Container>
        </Fade>
    );
}

export default CategoryPage;