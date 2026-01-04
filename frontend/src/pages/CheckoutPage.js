import React, { useState } from 'react';
import {
    Box, Typography, Container, Grid, TextField, Button,
    Paper, Divider, Stack, Fade, Breadcrumbs, InputAdornment
} from '@mui/material';
import {
    ChevronRight, CheckCircle, CreditCard,
    LocationOn, PhoneAndroid, Person,
    VerifiedUserOutlined, // Güvenlik rozeti için eklendi
    LocalShippingOutlined, // Kargo rozeti için eklendi
    SecurityOutlined // SSL rozeti için eklendi
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function CheckoutPage() {
    const { cartItems, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    // Form State Yönetimi
    const [isOrdered, setIsOrdered] = useState(false);
    const [formData, setFormData] = useState({
        address: '',
        city: '',
        phone: '',
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    // Hesaplamalar
    const subtotal = (cartItems || []).reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal >= 1000 ? 0 : 75;
    const total = subtotal + shipping;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        // Backend'in beklediği sipariş veri yapısı
        const orderData = {
            userEmail: user?.email || "misafir@boutique.com",
            totalAmount: total,
            address: `${formData.address} - ${formData.city} (Tel: ${formData.phone})`,
            items: cartItems.map(item => ({
                product: { id: item.id },
                quantity: item.quantity,
                priceAtPurchase: item.price
            }))
        };

        try {
            // Backend portu 8081 olarak güncellenmişti
            const response = await fetch('http://localhost:8081/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                clearCart();
                setIsOrdered(true);
                setTimeout(() => navigate('/orders'), 3000);
            } else {
                alert("An error occurred during the payment process. Please check your information..");
            }
        } catch (error) {
            alert("Could not connect to the server. Please ensure port 8081 is open..");
        }
    };

    if (isOrdered) {
        return (
            <Container sx={{ py: 20, textAlign: 'center' }}>
                <CheckCircle sx={{ fontSize: 100, color: '#4caf50', mb: 3 }} />
                <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, fontFamily: 'serif' }}>
                    Payment Successful!
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Your order is being prepared. You are being redirected to your Orders page....
                </Typography>
            </Container>
        );
    }

    return (
        <Fade in={true} timeout={800}>
            <Box sx={{ bgcolor: '#fcfcfc', minHeight: '100vh', py: 8 }}>
                <Container maxWidth="lg">
                    <Breadcrumbs separator={<ChevronRight fontSize="small" />} sx={{ mb: 4 }}>
                        <Typography color="inherit" sx={{ cursor: 'pointer' }} onClick={() => navigate('/cart')}>Cart</Typography>
                        <Typography color="text.primary" sx={{ fontWeight: 700 }}>Secure Payment</Typography>
                    </Breadcrumbs>

                    <Grid container spacing={6}>
                        {/* Sol Taraf: Formlar */}
                        <Grid item xs={12} md={7}>
                            <form onSubmit={handlePayment}>
                                <Stack spacing={4}>
                                    {/* Teslimat Bilgileri */}
                                    <Paper elevation={0} sx={{ p: 4, borderRadius: '24px', border: '1px solid #f0f0f0' }}>
                                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, fontFamily: 'serif' }}>
                                            Teslimat Bilgileri
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField fullWidth label="Full Adress" name="address" multiline rows={2} required onChange={handleChange}
                                                           InputProps={{ startAdornment: <InputAdornment position="start"><LocationOn /></InputAdornment> }} />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField fullWidth label="City" name="city" required onChange={handleChange} />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField fullWidth label="Telephone" name="phone" required onChange={handleChange}
                                                           InputProps={{ startAdornment: <InputAdornment position="start"><PhoneAndroid /></InputAdornment> }} />
                                            </Grid>
                                        </Grid>
                                    </Paper>

                                    {/* Kart Bilgileri */}
                                    <Paper elevation={0} sx={{ p: 4, borderRadius: '24px', border: '1px solid #f0f0f0' }}>
                                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, fontFamily: 'serif' }}>
                                            Card Information
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField fullWidth label="Card Name" name="cardName" required onChange={handleChange}
                                                           InputProps={{ startAdornment: <InputAdornment position="start"><Person /></InputAdornment> }} />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField fullWidth label="Card Number" name="cardNumber" placeholder="0000 0000 0000 0000" required onChange={handleChange}
                                                           InputProps={{ startAdornment: <InputAdornment position="start"><CreditCard /></InputAdornment> }} />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField fullWidth label="AA/YY" name="expiry" required onChange={handleChange} />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField fullWidth label="CVV" name="cvv" required onChange={handleChange} />
                                            </Grid>
                                        </Grid>
                                    </Paper>

                                    {/* ADIM 4: ÖDEMEYİ TAMAMLA BUTONU VE GÜVEN ROZETLERİ */}
                                    <Box>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            size="large"
                                            disabled={cartItems.length === 0}
                                            sx={{
                                                bgcolor: '#1a1a1a',
                                                py: 2.5,
                                                borderRadius: '50px',
                                                fontWeight: 800,
                                                mb: 4,
                                                '&:hover': { bgcolor: '#d9644a' }
                                            }}
                                        >
                                            {total.toLocaleString('tr-TR')} ₺ COMPLETE PAYMENT
                                        </Button>

                                        {/* GÜVEN ROZETLERİ: Kullanıcıya psikolojik güven sağlar */}
                                        <Stack
                                            direction="row"
                                            justifyContent="center"
                                            spacing={{ xs: 2, sm: 5 }}
                                            sx={{ opacity: 0.5, px: 2 }}
                                        >
                                            <Stack alignItems="center" spacing={0.5}>
                                                <SecurityOutlined sx={{ fontSize: 24 }} />
                                                <Typography variant="caption" sx={{ fontWeight: 700, textAlign: 'center' }}>256-BIT SSL</Typography>
                                            </Stack>
                                            <Stack alignItems="center" spacing={0.5}>
                                                <VerifiedUserOutlined sx={{ fontSize: 24 }} />
                                                <Typography variant="caption" sx={{ fontWeight: 700, textAlign: 'center' }}>SECURE PAYMENT</Typography>
                                            </Stack>
                                            <Stack alignItems="center" spacing={0.5}>
                                                <LocalShippingOutlined sx={{ fontSize: 24 }} />
                                                <Typography variant="caption" sx={{ fontWeight: 700, textAlign: 'center' }}>EASY RETURN</Typography>
                                            </Stack>
                                        </Stack>
                                    </Box>
                                </Stack>
                            </form>
                        </Grid>

                        {/* Sağ Taraf: Özet */}
                        <Grid item xs={12} md={5}>
                            <Paper elevation={0} sx={{ p: 4, borderRadius: '30px', bgcolor: '#fff', border: '1px solid #f0f0f0', position: 'sticky', top: 40 }}>
                                <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Order Summary</Typography>
                                <Stack spacing={2}>
                                    {cartItems.map((item) => (
                                        <Stack key={item.id} direction="row" justifyContent="space-between">
                                            <Typography variant="body2">{item.quantity}x {item.name}</Typography>
                                            <Typography variant="body2">{(item.price * item.quantity).toLocaleString('tr-TR')} ₺</Typography>
                                        </Stack>
                                    ))}
                                    <Divider sx={{ my: 1 }} />
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography color="text.secondary">Subtotal</Typography>
                                        <Typography>{subtotal.toLocaleString('tr-TR')} ₺</Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography color="text.secondary">Cargo</Typography>
                                        <Typography color={shipping === 0 ? "success.main" : "text.primary"}>
                                            {shipping === 0 ? "Free" : `${shipping} ₺`}
                                        </Typography>
                                    </Stack>
                                    <Divider sx={{ my: 1 }} />
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="h5" sx={{ fontWeight: 900 }}>Total</Typography>
                                        <Typography variant="h5" sx={{ fontWeight: 900, color: '#d9644a' }}>{total.toLocaleString('tr-TR')} ₺</Typography>
                                    </Stack>
                                </Stack>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Fade>
    );
}

export default CheckoutPage;