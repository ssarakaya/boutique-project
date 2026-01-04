import React, { useState } from 'react';
import { Box, Typography, Container, Grid, Button, IconButton, Divider, Stack, LinearProgress, Fade, Paper, Modal, Backdrop } from '@mui/material';
import { DeleteOutline, Add, Remove, ArrowForward, LocalMallOutlined, AutoAwesomeOutlined, KeyboardBackspace, CheckCircleOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CartPage() {
    const { cartItems, addToCart, removeFromCart, decreaseQuantity } = useCart();
    const navigate = useNavigate();
    const [openConfirm, setOpenConfirm] = useState(false); // Onay penceresi durumu
    const backendUrl = "http://localhost:8081";

    const getFullImageUrl = (item) => {
        const url = item.imageUrl || item.image_url;
        if (!url) return "https://via.placeholder.com/200x280?text=Beauty";
        return url.startsWith('http') ? url : `${backendUrl}${url}`;
    };

    const subtotal = React.useMemo(() => {
        return (cartItems || []).reduce((total, item) => {
            return total + (Number(item.price) || 0) * (Number(item.quantity) || 1);
        }, 0);
    }, [cartItems]);

    const shippingThreshold = 1000;
    const shippingCost = (subtotal >= shippingThreshold || subtotal === 0) ? 0 : 75;
    const totalCost = subtotal + shippingCost;
    const progress = Math.min((subtotal / shippingThreshold) * 100, 100);

    // Modal kontrol fonksiyonları
    const handleOpenConfirm = () => setOpenConfirm(true);
    const handleCloseConfirm = () => setOpenConfirm(false);
    const handleProceedToCheckout = () => {
        handleCloseConfirm();
        navigate('/checkout');
    };

    if (!cartItems || cartItems.length === 0) {
        return (
            <Fade in={true} timeout={1000}>
                <Container sx={{ py: 25, textAlign: 'center' }}>
                    <LocalMallOutlined sx={{ fontSize: 100, color: '#fdf0f0', mb: 3 }} />
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, fontFamily: 'serif' }}>
                        Alışveriş sepetiniz boş
                    </Typography>
                    <Button
                        onClick={() => navigate('/')}
                        sx={{
                            mt: 2,
                            color: '#d9644a',
                            fontWeight: 800,
                            borderBottom: '2px solid #f7d1d1',
                            borderRadius: 0,
                            '&:hover': { bgcolor: 'transparent', borderColor: '#d9644a' }
                        }}
                    >
                        EXPLORE THE COLLECTION
                    </Button>
                </Container>
            </Fade>
        );
    }

    return (
        <Fade in={true} timeout={1200}>
            <Box sx={{
                background: 'linear-gradient(to right, #fff 0%, #fffcfc 100%)',
                minHeight: '100vh',
                pt: 6,
                pb: 20
            }}>
                <Container maxWidth="lg">
                    <Button
                        startIcon={<KeyboardBackspace />}
                        onClick={() => navigate('/')}
                        sx={{
                            mb: 4,
                            color: 'text.secondary',
                            fontWeight: 700,
                            textTransform: 'none',
                            '&:hover': { color: '#d9644a', bgcolor: 'transparent' }
                        }}
                    >
                        Continue Shopping
                    </Button>

                    <Box sx={{ mb: 10, textAlign: 'center' }}>
                        <Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: -3, mb: 1, fontFamily: 'serif' }}>
                            Shopping Bag
                        </Typography>
                        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                            <AutoAwesomeOutlined sx={{ fontSize: 16, color: '#f7d1d1' }} />
                            <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 600, letterSpacing: 2 }}>
                                SELECTIONS JUST FOR YOU
                            </Typography>
                        </Stack>
                    </Box>

                    <Grid container spacing={8} justifyContent="center">
                        <Grid item xs={12} md={7}>
                            <Stack spacing={4}>
                                {cartItems.map((item) => (
                                    <Paper
                                        key={item.id}
                                        elevation={0}
                                        sx={{
                                            p: 3,
                                            borderRadius: '30px',
                                            bgcolor: '#fff',
                                            border: '1px solid #f9f0f0',
                                            transition: 'all 0.4s ease',
                                            '&:hover': { transform: 'scale(1.01)', boxShadow: '0 20px 40px rgba(247, 209, 209, 0.15)' }
                                        }}
                                    >
                                        <Grid container spacing={3} alignItems="center">
                                            <Grid item xs={4}>
                                                <Box
                                                    component="img"
                                                    src={getFullImageUrl(item)}
                                                    sx={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: '20px' }}
                                                />
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Stack spacing={1}>
                                                    <Stack direction="row" justifyContent="space-between">
                                                        <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: 'serif' }}>{item.name}</Typography>
                                                        <IconButton onClick={() => removeFromCart(item.id)} sx={{ color: '#eee', '&:hover': { color: '#d9644a' } }}>
                                                            <DeleteOutline />
                                                        </IconButton>
                                                    </Stack>
                                                    <Typography variant="body2" sx={{ color: '#d9644a', fontWeight: 700, letterSpacing: 1 }}>{item.sub_category || 'PREMIUM'}</Typography>
                                                    <Typography variant="h5" sx={{ fontWeight: 900, my: 1 }}>{(Number(item.price) || 0).toLocaleString('tr-TR')} ₺</Typography>
                                                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 1 }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#fffcfc', border: '1px solid #fdf0f0', borderRadius: '50px', px: 1 }}>
                                                            <IconButton size="small" onClick={() => decreaseQuantity(item.id)}><Remove fontSize="small" /></IconButton>
                                                            <Typography sx={{ mx: 2, fontWeight: 800 }}>{item.quantity}</Typography>
                                                            <IconButton size="small" onClick={() => addToCart(item)}><Add fontSize="small" /></IconButton>
                                                        </Box>
                                                    </Stack>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                ))}
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={5}>
                            <Box sx={{ position: 'sticky', top: 100 }}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 5,
                                        borderRadius: '50px',
                                        bgcolor: 'rgba(255, 255, 255, 0.8)',
                                        backdropFilter: 'blur(20px)',
                                        border: '1px solid #fdf0f0',
                                        boxShadow: '0 40px 100px rgba(217, 100, 74, 0.05)'
                                    }}
                                >
                                    <Typography variant="h4" sx={{ fontWeight: 900, mb: 4, fontFamily: 'serif' }}>Order Summary</Typography>

                                    <Box sx={{ mb: 5 }}>
                                        <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                                            <Typography variant="caption" sx={{ fontWeight: 800, color: '#d9644a' }}>
                                                {subtotal >= shippingThreshold ? "SHIPPING IS ON US! ✨" : ` FOR FREE SHIPPING${shippingThreshold - subtotal} ₺ LEFT `}
                                            </Typography>
                                        </Stack>
                                        <LinearProgress
                                            variant="determinate"
                                            value={progress}
                                            sx={{ height: 6, borderRadius: 3, bgcolor: '#fdf0f0', '& .MuiLinearProgress-bar': { bgcolor: '#f7d1d1' } }}
                                        />
                                    </Box>

                                    <Stack spacing={2.5}>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography color="text.secondary">Ürünler</Typography>
                                            <Typography sx={{ fontWeight: 700 }}>{subtotal.toLocaleString('tr-TR')} ₺</Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography color="text.secondary">Cargo</Typography>
                                            <Typography sx={{ fontWeight: 700, color: shippingCost === 0 ? '#d9644a' : '#1a1a1a' }}>
                                                {shippingCost === 0 ? 'Hediye' : `${shippingCost} ₺`}
                                            </Typography>
                                        </Stack>
                                        <Divider sx={{ my: 1, borderStyle: 'dashed', borderColor: '#f7d1d1' }} />
                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                            <Typography variant="h6" sx={{ fontWeight: 800 }}>TOPLAM</Typography>
                                            <Typography variant="h3" sx={{ fontWeight: 900, color: '#1a1a1a', letterSpacing: -2 }}>
                                                {totalCost.toLocaleString('tr-TR')} ₺
                                            </Typography>
                                        </Stack>
                                    </Stack>

                                    <Button
                                        fullWidth
                                        variant="contained"
                                        endIcon={<ArrowForward />}
                                        onClick={handleOpenConfirm}
                                        sx={{
                                            mt: 6,
                                            bgcolor: '#1a1a1a',
                                            color: '#fff',
                                            py: 2.5,
                                            borderRadius: '50px',
                                            fontWeight: 800,
                                            '&:hover': { bgcolor: '#d9644a', transform: 'translateY(-5px)' }
                                        }}
                                    >
                                        PROCEED TO PAYMENT
                                    </Button>
                                </Paper>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>

                {/* SİPARİŞİ TAMAMLA ONAY PENCERESİ */}
                <Modal
                    open={openConfirm}
                    onClose={handleCloseConfirm}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{ timeout: 500 }}
                >
                    <Fade in={openConfirm}>
                        <Box sx={{
                            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                            width: 400, bgcolor: 'background.paper', borderRadius: '30px', boxShadow: 24, p: 5, textAlign: 'center'
                        }}>
                            <CheckCircleOutline sx={{ fontSize: 60, color: '#d9644a', mb: 2 }} />
                            <Typography variant="h5" sx={{ fontWeight: 900, mb: 2, fontFamily: 'serif' }}>Complete Order</Typography>
                            <Typography sx={{ color: 'text.secondary', mb: 4 }}>
                                Do you want to finish your purchase and proceed to the payment page?
                            </Typography>
                            <Stack direction="row" spacing={2}>
                                <Button
                                    fullWidth
                                    onClick={handleCloseConfirm}
                                    sx={{ color: 'text.secondary', fontWeight: 700 }}
                                >
                                    CANCEL
                                </Button>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={handleProceedToCheckout}
                                    sx={{ bgcolor: '#1a1a1a', borderRadius: '50px', fontWeight: 800, '&:hover': { bgcolor: '#d9644a' } }}
                                >
                                    YES
                                </Button>
                            </Stack>
                        </Box>
                    </Fade>
                </Modal>
            </Box>
        </Fade>
    );
}

export default CartPage;