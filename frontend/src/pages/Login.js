import React, { useState } from 'react';
import { Box, Container, Grid, Typography, TextField, Button, Fade, Stack, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff, East, AutoAwesomeOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Yeni isimlendirdiğimiz Context

function Login() {
    const navigate = useNavigate();
    const { login, signup } = useAuth(); // AuthContext'ten fonksiyonları alıyoruz

    const [isLogin, setIsLogin] = useState(true); // Giriş mi Kayıt mı kontrolü
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });
    const [error, setError] = useState("");

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            if (isLogin) {
                // Giriş yaparken objeyi senin Context yapına uygun gönderiyoruz
                await login({
                    displayName: formData.email.split('@')[0],
                    email: formData.email
                });
            } else {
                // Kayıt olurken ismi de ekliyoruz
                await login({
                    displayName: formData.name,
                    email: formData.email
                });
            }
            navigate('/'); // Başarılıysa ana sayfaya git
        } catch (err) {
            setError("Bir hata oluştu. Lütfen bilgilerinizi kontrol edin.");
        }
    };

    return (
        <Fade in={true} timeout={1000}>
            <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', bgcolor: '#fffcfc' }}>
                <Container maxWidth="lg">
                    <Grid container sx={{ boxShadow: '0 40px 100px rgba(0,0,0,0.05)', borderRadius: '40px', overflow: 'hidden', bgcolor: '#fff' }}>

                        {/* SOL: Şık Görsel Alanı (Senin Orijinal Tasarımın) */}
                        <Grid item xs={12} md={6} sx={{
                            display: { xs: 'none', md: 'flex' },
                            flexDirection: 'column',
                            justifyContent: 'center',
                            p: 8,
                            bgcolor: '#f7d1d1',
                            position: 'relative'
                        }}>
                            <Box sx={{ zIndex: 1 }}>
                                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                                    <AutoAwesomeOutlined sx={{ color: '#1a1a1a' }} />
                                    <Typography variant="overline" sx={{ fontWeight: 800, letterSpacing: 3 }}>
                                        ÖZEL ÜYELİK
                                    </Typography>
                                </Stack>
                                <Typography variant="h2" sx={{ fontWeight: 900, mb: 3, fontFamily: 'serif', lineHeight: 1 }}>
                                    Zarafetin <br /> Dünyasına <br /> Katılın.
                                </Typography>
                                <Typography variant="body1" sx={{ opacity: 0.7, maxWidth: 300, lineHeight: 1.8 }}>
                                    Koleksiyonlarımızı keşfetmek ve size özel avantajlardan yararlanmak için oturum açın.
                                </Typography>
                            </Box>
                            {/* Dekoratif Arka Plan Yazısı */}
                            <Typography sx={{ position: 'absolute', bottom: -20, right: -20, fontSize: '10rem', fontWeight: 900, color: 'rgba(255,255,255,0.2)', pointerEvents: 'none' }}>
                                B.
                            </Typography>
                        </Grid>

                        {/* SAĞ: Form Alanı */}
                        <Grid item xs={12} md={6} sx={{ p: { xs: 4, md: 10 } }}>
                            <Box component="form" onSubmit={handleFormSubmit}>
                                <Typography variant="h4" sx={{ fontWeight: 900, mb: 1, fontFamily: 'serif' }}>
                                    {isLogin ? 'Tekrar Hoşgeldiniz' : 'Aramıza Katılın'}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 5 }}>
                                    {isLogin ? 'Lütfen bilgilerinizi giriniz.' : 'Yeni bir hesap oluşturun.'}
                                </Typography>

                                {error && <Typography color="error" sx={{ mb: 2, fontSize: '0.8rem', fontWeight: 700 }}>{error}</Typography>}

                                <Stack spacing={3}>
                                    {!isLogin && (
                                        <TextField
                                            fullWidth label="AD SOYAD" variant="standard" required
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            sx={{ '& .MuiInput-underline:after': { borderBottomColor: '#f7d1d1' } }}
                                        />
                                    )}
                                    <TextField
                                        fullWidth label="E-POSTA" variant="standard" required type="email"
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        sx={{ '& .MuiInput-underline:after': { borderBottomColor: '#f7d1d1' } }}
                                    />
                                    <TextField
                                        fullWidth label="ŞİFRE" variant="standard" required
                                        type={showPassword ? 'text' : 'password'}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                        sx={{ '& .MuiInput-underline:after': { borderBottomColor: '#f7d1d1' } }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Stack>

                                <Button
                                    fullWidth variant="contained" type="submit" endIcon={<East />}
                                    sx={{
                                        mt: 6, bgcolor: '#1a1a1a', py: 2, borderRadius: '50px', fontWeight: 800,
                                        '&:hover': { bgcolor: '#d9644a' }
                                    }}
                                >
                                    {isLogin ? 'GİRİŞ YAP' : 'KAYIT OL'}
                                </Button>

                                <Box sx={{ mt: 4, textAlign: 'center' }}>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {isLogin ? 'Hesabınız yok mu?' : 'Zaten üye misiniz?'}
                                        <Button
                                            onClick={() => setIsLogin(!isLogin)}
                                            sx={{ ml: 1, color: '#d9644a', fontWeight: 800, textTransform: 'none' }}
                                        >
                                            {isLogin ? 'Kayıt Olun' : 'Giriş Yapın'}
                                        </Button>
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Fade>
    );
}

export default Login;