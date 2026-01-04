import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container, Grid, Typography, Box, Button, Rating,
    Divider, Stack, Tab, Tabs, TextField, Paper, Fade, Avatar, IconButton
} from '@mui/material';
import {
    AddShoppingCart,
    LocalShipping as LocalShippingIcon,
    VerifiedUser as VerifiedUserOutlined,
    KeyboardBackspace,
    DeleteOutline as DeleteIcon
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';

// --- SABİT MANUEL YORUMLAR ---
const dummyComments = [
    { id: 'd1', userName: "Zeynep Yılmaz", text: "Kumaşı harika, tam istediğim gibi geldi! Kesinlikle tavsiye ederim. 😍", rating: 5, date: "2026-01-01" },
    { id: 'd2', userName: "Emre Can", text: "Kargo hızı muazzam, paketleme çok özenliydi. Teşekkürler Boutique.", rating: 4, date: "2026-01-02" },
    { id: 'd3', userName: "Selin Demir", text: "Rengi göründüğünden bir tık daha canlı. Kendi bedeninizi alabilirsiniz.", rating: 5, date: "2026-01-03" },
    { id: 'd4', userName: "Mert Kaya", text: "Fiyat performans ürünü. Dikişleri gayet sağlam görünüyor.", rating: 4, date: "2025-12-28" },
    { id: 'd5', userName: "Aslı Gök", text: "Hediye olarak almıştım, arkadaşım bayıldı. Çok zarif bir parça.", rating: 5, date: "2025-12-25" },
    { id: 'd6', userName: "Deniz Aras", text: "Kalıbı biraz dar gibi ama şıklığı ve duruşu tartışılmaz.", rating: 3, date: "2025-12-20" },
    { id: 'd7', userName: "Burak Aydın", text: "Beklediğimden daha kaliteli çıktı. Diğer renklerini de sipariş vereceğim.", rating: 5, date: "2025-12-15" }
];

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const [newComment, setNewComment] = useState("");
    const [userName, setUserName] = useState("");
    const [userRating, setUserRating] = useState(5);
    const [backendComments, setBackendComments] = useState([]); // backend'den gelenler

    // --- VERİ ÇEKME (GET) ---
    useEffect(() => {
        fetch(`http://localhost:8081/api/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
            .catch(err => console.error("Ürün yüklenemedi:", err));

        fetch(`http://localhost:8081/api/comments/${id}`)
            .then(res => res.json())
            .then(data => setBackendComments(data.reverse()))
            .catch(err => console.error("Yorumlar yüklenemedi:", err));
    }, [id]);

    // --- TÜM YORUMLARI BİRLEŞTİR ---
    const allComments = [...backendComments, ...dummyComments];

    // --- YORUM EKLEME (POST) ---
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim() || !userName.trim()) {
            alert("Lütfen isim ve yorum alanlarını doldurun.");
            return;
        }

        const commentData = {
            productId: id,
            userName: userName,
            text: newComment,
            rating: userRating
        };

        fetch("http://localhost:8081/api/comments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(commentData)
        })
            .then(res => res.json())
            .then(savedComment => {
                setBackendComments([savedComment, ...backendComments]);
                setNewComment("");
                setUserName("");
                setUserRating(5);
            })
            .catch(err => console.error("Yorum gönderilemedi:", err));
    };

    // --- YORUM SİLME (DELETE) ---
    const handleCommentDelete = (commentId) => {
        if (typeof commentId === 'string' && commentId.startsWith('d')) return; // Manuel yorumlar silinmez

        fetch(`http://localhost:8081/api/comments/${commentId}`, {
            method: "DELETE"
        })
            .then(() => {
                setBackendComments(backendComments.filter(c => c.id !== commentId));
            })
            .catch(err => console.error("Silme hatası:", err));
    };

    // --- DİNAMİK PUAN HESAPLAMA ---
    const calculateAverage = () => {
        if (allComments.length === 0) return 0;
        const total = allComments.reduce((acc, curr) => acc + curr.rating, 0);
        return (total / allComments.length).toFixed(1);
    };

    if (!product) return (
        <Container sx={{ py: 10, textAlign: 'center' }}>
            <Typography variant="h6">Ürün bilgileri yükleniyor...</Typography>
        </Container>
    );

    const rawImage = product.imageUrl || product.image_url;
    const finalImage = rawImage
        ? (rawImage.startsWith('http') ? rawImage : `http://localhost:8081${rawImage.startsWith('/') ? '' : '/'}${rawImage}`)
        : "https://via.placeholder.com/600x800?text=Gorsel+Yok";

    return (
        <Fade in={true} timeout={800}>
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Button
                    startIcon={<KeyboardBackspace />}
                    onClick={() => navigate(-1)}
                    sx={{ mb: 4, color: 'text.secondary', textTransform: 'none', '&:hover': { color: '#d9644a' } }}
                >
                    Geri Dön
                </Button>

                <Grid container spacing={8}>
                    {/* SOL TARAF: Ürün Görseli */}
                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            src={finalImage}
                            alt={product.name}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/600x800?text=Resim+Yuklenemedi";
                            }}
                            sx={{
                                width: '100%',
                                borderRadius: '40px',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                                display: 'block',
                                objectFit: 'cover',
                                backgroundColor: '#f9f9f9',
                                minHeight: '500px'
                            }}
                        />
                    </Grid>

                    {/* SAĞ TARAF: Ürün Bilgileri */}
                    <Grid item xs={12} md={6}>
                        <Stack spacing={3}>
                            <Typography variant="overline" sx={{ color: '#d9644a', fontWeight: 800, letterSpacing: 2 }}>
                                {product.category || 'ÖZEL KOLEKSİYON'}
                            </Typography>
                            <Typography variant="h2" sx={{ fontWeight: 900, fontFamily: 'serif', lineHeight: 1.2 }}>
                                {product.name}
                            </Typography>

                            <Stack direction="row" spacing={2} alignItems="center">
                                <Rating
                                    value={Number(calculateAverage())}
                                    precision={0.1}
                                    readOnly
                                />
                                <Typography variant="body2" color="text.secondary">
                                    {calculateAverage()} / 5 ({allComments.length} Değerlendirme)
                                </Typography>
                            </Stack>

                            <Typography variant="h3" sx={{ fontWeight: 800, color: '#1a1a1a' }}>
                                {product.price?.toLocaleString('tr-TR')} ₺
                            </Typography>

                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                                {product.description || "Zarafeti ve konforu bir arada sunan bu özel tasarım."}
                            </Typography>

                            <Divider sx={{ my: 2 }} />

                            <Stack spacing={2}>
                                <Stack direction="row" spacing={1.5} alignItems="center">
                                    <LocalShippingIcon sx={{ color: '#d9644a', fontSize: 20 }} />
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Aynı Gün Ücretsiz Kargo</Typography>
                                </Stack>
                                <Stack direction="row" spacing={1.5} alignItems="center">
                                    <VerifiedUserOutlined sx={{ color: '#d9644a', fontSize: 20 }} />
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Güvenli Ödeme & Orijinal Ürün</Typography>
                                </Stack>
                            </Stack>

                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<AddShoppingCart />}
                                onClick={() => addToCart(product)}
                                sx={{
                                    bgcolor: '#1a1a1a', py: 2.5, borderRadius: '50px', fontWeight: 800, mt: 4,
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                    '&:hover': { bgcolor: '#d9644a' }
                                }}
                            >
                                SEPETE EKLE
                            </Button>
                        </Stack>
                    </Grid>

                    {/* ALT KISIM: Tablar */}
                    <Grid item xs={12} sx={{ mt: 8 }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
                                <Tab label="Product Description" sx={{ fontWeight: 700 }} />
                                <Tab label={`Customer Comments (${allComments.length})`} sx={{ fontWeight: 700 }} />
                            </Tabs>
                        </Box>

                        {tabValue === 0 && (
                            <Box sx={{ py: 5 }}>
                                <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 850, lineHeight: 2 }}>
                                    {/* Eğer backend'den gelen bir açıklama varsa onu göster, yoksa varsayılan metni yaz */}
                                    {product.description
                                        ? product.description
                                        : "This is part of a special design Boutique collection. It is crafted with high-quality materials and meticulous workmanship to complement your style."
                                    }
                                </Typography>

                                {/* Projeyi daha dolu göstermek için ekstra detaylar ekleyebilirsin */}
                                <Stack spacing={2} sx={{ mt: 4 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Materials and Care:</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        • 100% Sustainable and high-quality fabric.<br/>
                                        • Gentle washing recommended<br/>
                                        • Domestic Production
                                    </Typography>
                                </Stack>
                            </Box>
                        )}

                        {tabValue === 1 && (
                            <Box sx={{ py: 5 }}>
                                <Typography variant="h5" sx={{ mb: 4, fontWeight: 800 }}>Customer Experiences</Typography>

                                <Stack spacing={4} sx={{ mb: 8 }}>
                                    {allComments.map((c) => (
                                        <Paper key={c.id} elevation={0} sx={{ p: 4, borderRadius: '25px', border: '1px solid #f0f0f0', bgcolor: '#fdfdfd', position: 'relative' }}>
                                            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                                                <Avatar sx={{ bgcolor: '#f7d1d1', color: '#1a1a1a', fontWeight: 700 }}>
                                                    {c.userName ? c.userName[0].toUpperCase() : 'U'}
                                                </Avatar>
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography sx={{ fontWeight: 800 }}>{c.userName}</Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {c.id.toString().startsWith('d') ? c.date : new Date(c.date).toLocaleDateString('tr-TR')}
                                                    </Typography>
                                                </Box>
                                                <Rating value={c.rating} size="small" readOnly />

                                                {!c.id.toString().startsWith('d') && (
                                                    <IconButton
                                                        onClick={() => handleCommentDelete(c.id)}
                                                        size="small"
                                                        sx={{ ml: 1, color: 'text.disabled', '&:hover': { color: '#d9644a' } }}
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                )}
                                            </Stack>
                                            <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                                "{c.text}"
                                            </Typography>
                                        </Paper>
                                    ))}
                                </Stack>

                                <Paper elevation={0} sx={{ p: 5, borderRadius: '30px', bgcolor: '#f8f8f8' }}>
                                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 900 }}>Share Your Opinions</Typography>
                                    <Stack spacing={3}>
                                        <Box>
                                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>Your Score:</Typography>
                                            <Rating
                                                value={userRating}
                                                onChange={(event, newValue) => setUserRating(newValue)}
                                            />
                                        </Box>

                                        <TextField
                                            fullWidth
                                            label="Name Surname"
                                            variant="filled"
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                            sx={{ bgcolor: '#fff', borderRadius: '10px' }}
                                        />
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={4}
                                            placeholder="Write your Comment Here.."
                                            variant="filled"
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            sx={{ bgcolor: '#fff', borderRadius: '10px' }}
                                        />
                                        <Button
                                            variant="contained"
                                            onClick={handleCommentSubmit}
                                            sx={{ bgcolor: '#1a1a1a', px: 8, py: 2, borderRadius: '50px', fontWeight: 800 }}
                                        >
                                            Viev The Comment
                                        </Button>
                                    </Stack>
                                </Paper>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Fade>
    );
}

export default ProductDetail;