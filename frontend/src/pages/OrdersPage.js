import React, { useEffect, useState } from 'react';
import {
    Container, Typography, Paper, Stack, Box, Divider,
    Fade, Chip, CircularProgress, Alert, Avatar
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { LocalShippingOutlined, ReceiptLongOutlined, Inventory2Outlined } from '@mui/icons-material';

function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError(null);
            const email = user?.email || "misafir@boutique.com";

            try {
                const response = await fetch(`http://localhost:8081/api/orders/user/${email}`);
                if (!response.ok) {
                    throw new Error("Sunucu yanıt vermedi (8080 portunu ve endpoint'i kontrol edin)");
                }
                const data = await response.json();
                if (Array.isArray(data)) {
                    setOrders(data.reverse());
                } else {
                    setOrders([]);
                }
            } catch (err) {
                console.error("Fetch Hatası:", err);
                setError("Siparişleriniz yüklenirken bir sorun oluştu. Lütfen sunucunun (8081) çalıştığından emin olun.");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [user]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 20 }}>
                <CircularProgress sx={{ color: '#1a1a1a', mb: 2 }} />
                <Typography color="text.secondary">Veriler çekiliyor...</Typography>
            </Box>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 10 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <ReceiptLongOutlined sx={{ fontSize: 40, mb: 2, color: '#d9644a' }} />
                <Typography variant="h3" sx={{ fontWeight: 900, fontFamily: 'serif' }}>
                    Siparişlerim
                </Typography>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 4, borderRadius: '15px' }}>
                    {error}
                </Alert>
            )}

            <Stack spacing={4}>
                {orders.length === 0 && !error ? (
                    <Fade in timeout={1000}>
                        <Paper elevation={0} sx={{ p: 8, textAlign: 'center', borderRadius: '30px', border: '2px dashed #eee' }}>
                            <Typography variant="h6" color="text.secondary">Henüz bir sipariş kaydı bulunamadı.</Typography>
                        </Paper>
                    </Fade>
                ) : (
                    orders.map((order) => (
                        <Fade in key={order.id} timeout={500}>
                            <Paper elevation={0} sx={{
                                p: 4,
                                borderRadius: '30px',
                                border: '1px solid #f0f0f0',
                                '&:hover': { boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }
                            }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <Typography variant="caption" sx={{ fontWeight: 800, color: '#d9644a' }}>
                                            SİPARİŞ #{order.id}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {order.orderDate ? new Date(order.orderDate).toLocaleDateString('tr-TR') : "Tarih Bilgisi Yok"}
                                        </Typography>
                                    </Box>
                                    <Chip
                                        icon={<LocalShippingOutlined />}
                                        label="Hazırlanıyor"
                                        sx={{ borderRadius: '10px', fontWeight: 600, bgcolor: '#fdf7f5', color: '#d9644a' }}
                                    />
                                </Stack>

                                <Divider sx={{ my: 3 }} />

                                {/* --- GÖRSEL İÇEREN ÜRÜN LİSTESİ --- */}
                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2, color: '#555', display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Inventory2Outlined fontSize="small" /> Satın Alınan Ürünler:
                                    </Typography>
                                    <Stack spacing={2}>
                                        {order.items && order.items.map((item, index) => (
                                            <Stack key={index} direction="row" justifyContent="space-between" alignItems="center">
                                                <Stack direction="row" spacing={2} alignItems="center">
                                                    {/* Ürün Görseli */}
                                                    <Avatar
                                                        variant="rounded"
                                                        src={`http://localhost:8081${item.product?.imageUrl || item.product?.image_url}`}
                                                        sx={{ width: 60, height: 80, borderRadius: '10px', bgcolor: '#f5f5f5' }}
                                                    >
                                                        {/* Görsel yüklenemezse ikon gösterilir */}
                                                        <Inventory2Outlined />
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                                            {item.product?.name || "Bilinmeyen Ürün"}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            Adet: {item.quantity}
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                    {(item.priceAtPurchase * item.quantity).toLocaleString('tr-TR')} ₺
                                                </Typography>
                                            </Stack>
                                        ))}
                                    </Stack>
                                </Box>
                                {/* ------------------------------ */}

                                <Divider sx={{ my: 2, borderStyle: 'dashed' }} />

                                <Box sx={{ mb: 2, mt: 2 }}>
                                    <Typography variant="body2" color="text.secondary">Teslimat Adresi:</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 500 }}>{order.address}</Typography>
                                </Box>

                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 900 }}>
                                        Toplam: {order.totalAmount?.toLocaleString('tr-TR')} ₺
                                    </Typography>
                                </Stack>
                            </Paper>
                        </Fade>
                    ))
                )}
            </Stack>
        </Container>
    );
}

export default OrdersPage;