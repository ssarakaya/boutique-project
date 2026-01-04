import { Card, CardContent, Typography, Button, CardMedia, Box, IconButton, Rating, Stack } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite'; // Ekledik
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext"; // Favori yapısını bağladık

function ProductCard({ product }) {

    const { addToCart } = useCart();
    // Burası öğrenci işi not: Favorileri kontrol etmek için context'i çağırdık
    const { toggleFavorite, favorites } = useFavorites();
    const isFav = favorites.some(f => f.id === product.id);

    const backendUrl = "http://localhost:8081";

    const getFullImageUrl = (url) => {
        if (!url) return "https://via.placeholder.com/300x400";
        if (url.startsWith('http')) return url;
        return `${backendUrl}${url}`;
    };

    const pinkButtonStyle = {
        backgroundColor: "#f7d1d1",
        color: "#1a1a1a",
        borderRadius: "15px",
        fontSize: "0.95rem",
        fontWeight: 700,
        textTransform: "none",
        boxShadow: "0 2px 8px rgba(247, 209, 209, 0.3)",
        py: 1.2,
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "&:hover": {
            backgroundColor: "#f2b9b9",
            transform: "scale(1.02)",
            boxShadow: "0 6px 15px rgba(247, 209, 209, 0.5)"
        }
    };

    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: "25px",
                backgroundColor: "transparent",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                    transform: "translateY(-10px)",
                }
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: "25px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
                }}
            >
                {/* Kalp butonunun içini isFav durumuna göre güncelledim */}
                <IconButton
                    onClick={(e) => {
                        e.stopPropagation(); // Karta tıklanıp detay sayfasına gitmeyi önler
                        toggleFavorite(product); // Ürünü favoriye atar veya çıkarır
                    }}
                    sx={{
                        position: 'absolute',
                        top: 15,
                        right: 15,
                        zIndex: 2,
                        backgroundColor: 'rgba(255,255,255,0.85)',
                        backdropFilter: "blur(8px)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                            backgroundColor: "#fff",
                            transform: "scale(1.1)"
                        }
                    }}
                >
                    {/* Eğer favorideyse kırmızı dolu kalp, değilse senin boş kalbin görünüyor */}
                    {isFav ? (
                        <FavoriteIcon fontSize="small" sx={{ color: "#d9644a" }} />
                    ) : (
                        <FavoriteBorderIcon fontSize="small" sx={{ color: "#d9644a" }} />
                    )}
                </IconButton>

                <CardMedia
                    component="img"
                    height="280"
                    image={getFullImageUrl(product.imageUrl || product.image_url)}
                    alt={product.name}
                    sx={{
                        objectFit: 'cover',
                        transition: "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        "&:hover": { transform: "scale(1.12)" }
                    }}
                />
            </Box>

            <CardContent sx={{ pt: 2, px: 1, textAlign: 'center' }}>
                <Typography
                    variant="caption"
                    sx={{
                        color: "text.secondary",
                        fontWeight: 700,
                        letterSpacing: 2,
                        textTransform: 'uppercase',
                        opacity: 0.7
                    }}
                >
                    {product.subCategory || product.sub_category}
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 800,
                        mt: 0.5,
                        mb: 0.5,
                        color: "#2c3e50",
                        fontSize: "1rem",
                        lineHeight: 1.2,
                        minHeight: "1.4rem",
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}
                >
                    {product.name}
                </Typography>

                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0.5}
                    sx={{ my: 0.5 }}
                >
                    <Rating value={4.5} precision={0.5} size="small" readOnly />
                    <Typography variant="caption" sx={{ fontWeight: 600, color: "text.secondary" }}>
                        (12)
                    </Typography>
                </Stack>

                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 900,
                        color: "#d9644a",
                        mb: 1.5,
                        fontSize: "1.1rem"
                    }}
                >
                    {product.price.toLocaleString('tr-TR')} ₺
                </Typography>

                <Button
                    fullWidth
                    variant="contained"
                    onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                    }}
                    sx={pinkButtonStyle}
                >
                    Add to Cart
                </Button>
            </CardContent>
        </Card>
    );
}

export default ProductCard;