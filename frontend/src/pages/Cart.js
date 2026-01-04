import React, { useState, useEffect } from 'react'; // useEffect ve useState eklendi
import { Box, Typography, Container, Grid, Button, IconButton, Divider, Stack, LinearProgress, Fade, Paper } from '@mui/material';
import { DeleteOutline, Add, Remove, KeyboardBackspace, AutoAwesomeOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
    const { cartItems, addToCart, removeFromCart, decreaseQuantity } = useCart();
    const navigate = useNavigate();

    // --- YENİ: Tamamlayıcı ürünler için state ---
    const [recommendations, setRecommendations] = useState([]);

    // --- YENİ: Veritabanından rastgele öneri ürünleri çekme ---
    useEffect(() => {
        fetch("http://localhost:8081/api/products")
            .then(res => res.json())
            .then(data => {
                // Mevcut sepet dışındaki ürünlerden rastgele 4 tane seç
                const otherProducts = data
                    .filter(p => !cartItems.find(item => item.id === p.id))
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 4);
                setRecommendations(otherProducts);
            })
            .catch(err => console.error("Öneriler yüklenemedi:", err));
    }, [cartItems]);

    const subtotal = React.useMemo(() => {
        return (cartItems || []).reduce((acc, item) => {
            const price = Number(item.price) || 0;
            const qty = Number(item.quantity) || 0;
            return acc + (price * qty);
        }, 0);
    }, [cartItems]);

    const shippingThreshold = 1000;
    const shippingCost = (subtotal >= shippingThreshold || subtotal === 0) ? 0 : 75;
    const totalCost = subtotal + shippingCost;
    const progress = Math.min((subtotal / shippingThreshold) * 100, 100);

    if (!cartItems || cartItems.length === 0) {
        return (
            <Container sx={{ py: 15, textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 900, mb: 4, fontFamily: 'serif' }}>Sepetiniz Boş</Typography>
                <Button
                    variant="contained"
                    onClick={() => navigate('/')}
                    sx={{ bgcolor: '#1a1a1a', px: 5, py: 2, borderRadius: '50px', fontWeight: 900 }}
                >
                    ALIŞVERİŞE BAŞLA
                </Button>
            </Container>
        );
    }

    return (
        <Fade in={true} timeout={800}>
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography variant="h3" sx={{ fontWeight: 900, mb: 6, letterSpacing: -2, fontFamily: 'serif' }}>Sepetim</Typography>

                <Grid container spacing={6}>
                    <Grid item xs={12} md={8}>

                        {/* --- ADIM 3: ETKİLEŞİMLİ KARGO BARI --- */}
                        <Box sx={{ mb: 6, p: 4, bgcolor: '#fdfcfa', borderRadius: '25px', border: '1px solid #f7d1d1' }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                                    {subtotal >= shippingThreshold
                                        ? "Harika! Kargonuz tarafımızdan karşılanıyor 🚚"
                                        : `Ücretsiz kargo için sadece ${Math.round(shippingThreshold - subtotal)} ₺ kaldı!`}
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 900, color: '#d9644a' }}>
                                    %{Math.round(progress)}
                                </Typography>
                            </Stack>

                            <LinearProgress
                                variant="determinate"
                                value={progress}
                                sx={{
                                    height: 12,
                                    borderRadius: 6,
                                    bgcolor: '#fff',
                                    '& .MuiLinearProgress-bar': {
                                        bgcolor: progress === 100 ? '#4caf50' : '#f7d1d1', // Tamamlanınca yeşil olur
                                        borderRadius: 6
                                    }
                                }}
                            />
                        </Box>

                        {/* Sepet Listesi */}
                        <Stack spacing={4}>
                            {cartItems.map((item) => (
                                <Box key={item.id} sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                                    <Box
                                        component="img"
                                        src={`http://localhost:8081${item.image_url || item.imageUrl}`}
                                        sx={{ width: 110, height: 140, objectFit: 'cover', borderRadius: '20px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
                                    />
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 800 }}>{item.name}</Typography>
                                        <Typography variant="h5" sx={{ fontWeight: 900, color: "#d9644a" }}>
                                            {(Number(item.price) || 0).toFixed(2)} ₺
                                        </Typography>
                                    </Box>
                                    <Stack direction="row" alignItems="center" spacing={1} sx={{ bgcolor: '#f5f5f5', borderRadius: '50px', p: 0.5 }}>
                                        <IconButton size="small" onClick={() => decreaseQuantity(item.id)}><Remove /></IconButton>
                                        <Typography sx={{ fontWeight: 900, minWidth: 30, textAlign: 'center' }}>{item.quantity}</Typography>
                                        <IconButton size="small" onClick={() => addToCart(item)}><Add /></IconButton>
                                    </Stack>
                                    <IconButton color="error" onClick={() => removeFromCart(item.id)}><DeleteOutline /></IconButton>
                                </Box>
                            ))}
                        </Stack>

                        <Divider sx={{ my: 6 }} />

                        {/* --- ADIM 2: TAMAMLAYICI ÜRÜNLER (CROSS-SELL) --- */}
                        <Box sx={{ mt: 4 }}>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 4 }}>
                                <AutoAwesomeOutlined sx={{ color: '#d9644a' }} />
                                <Typography variant="h5" sx={{ fontWeight: 900, fontFamily: 'serif' }}>Bu Kombini Tamamlayın</Typography>
                            </Stack>
                            <Grid container spacing={3}>
                                {recommendations.map((prod) => (
                                    <Grid item xs={6} sm={3} key={prod.id}>
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: 2, borderRadius: '20px', border: '1px solid #f0f0f0', textAlign: 'center',
                                                cursor: 'pointer', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)', borderColor: '#f7d1d1' }
                                            }}
                                            onClick={() => navigate(`/product/${prod.id}`)}
                                        >
                                            <Box
                                                component="img"
                                                src={`http://localhost:8081${prod.image_url || prod.imageUrl}`}
                                                sx={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: '15px', mb: 1.5 }}
                                            />
                                            <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {prod.name}
                                            </Typography>
                                            <Button
                                                size="small"
                                                fullWidth
                                                variant="outlined"
                                                onClick={(e) => { e.stopPropagation(); addToCart(prod); }}
                                                sx={{ borderRadius: '50px', fontSize: '0.7rem', fontWeight: 800, color: '#1a1a1a', borderColor: '#1a1a1a' }}
                                            >
                                                EKLE +
                                            </Button>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>

                        <Button
                            startIcon={<KeyboardBackspace />}
                            onClick={() => navigate('/')}
                            sx={{ mt: 8, color: '#1a1a1a', fontWeight: 700 }}
                        >
                            Alışverişe Devam Et
                        </Button>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Box sx={{ p: 4, bgcolor: '#fdfcfa', borderRadius: '40px', border: '1px solid rgba(0,0,0,0.05)', position: 'sticky', top: 100 }}>
                            <Typography variant="h5" sx={{ fontWeight: 900, mb: 4 }}>Sipariş Özeti</Typography>
                            <Stack spacing={3}>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography color="text.secondary">Ara Toplam</Typography>
                                    <Typography sx={{ fontWeight: 800 }}>{subtotal.toFixed(2)} ₺</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography color="text.secondary">Kargo</Typography>
                                    <Typography sx={{ fontWeight: 800, color: shippingCost === 0 ? '#4caf50' : '#1a1a1a' }}>
                                        {shippingCost === 0 ? 'Ücretsiz' : `${shippingCost} ₺`}
                                    </Typography>
                                </Stack>
                                <Divider />
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="h5" sx={{ fontWeight: 900 }}>Toplam</Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 900, color: '#d9644a' }}>{totalCost.toFixed(2)} ₺</Typography>
                                </Stack>
                            </Stack>
                            <Button
                                fullWidth variant="contained"
                                onClick={() => navigate('/checkout')}
                                sx={{ mt: 5, bgcolor: '#1a1a1a', py: 2, borderRadius: '50px', fontWeight: 900, '&:hover': { bgcolor: '#d9644a' } }}
                            >
                                ÖDEMEYE GEÇ
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Fade>
    );
}

export default Cart;