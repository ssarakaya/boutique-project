import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, Fade, Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false); // Bildirim kontrolü
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:8081/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.text();

            if (response.ok && data === "User registered successfully!") {
                setOpenSnackbar(true); // Başarılı bildirimini aç
                // 2 saniye sonra login sayfasına yönlendir
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setError(data || "Kayıt sırasında bir hata oluştu.");
            }
        } catch (err) {
            setError("Sunucuya bağlanılamadı.");
        }
    };

    return (
        <Fade in={true} timeout={1000}>
            <Container maxWidth="xs" sx={{ py: 15 }}>
                <Paper elevation={0} sx={{ p: 4, borderRadius: '30px', border: '1px solid #fdf0f0' }}>
                    <Typography variant="h4" sx={{ fontWeight: 900, mb: 4, textAlign: 'center', fontFamily: 'serif' }}>
                        Aramıza Katıl
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 2, borderRadius: '10px' }}>{error}</Alert>}

                    <form onSubmit={handleRegister}>
                        <TextField
                            fullWidth label="Ad Soyad" variant="standard" margin="normal"
                            value={name} onChange={(e) => setName(e.target.value)} required
                        />
                        <TextField
                            fullWidth label="E-posta" variant="standard" margin="normal"
                            value={email} onChange={(e) => setEmail(e.target.value)} required
                        />
                        <TextField
                            fullWidth label="Şifre" type="password" variant="standard" margin="normal"
                            value={password} onChange={(e) => setPassword(e.target.value)} required
                        />
                        <Button
                            fullWidth type="submit" variant="contained"
                            sx={{ mt: 5, bgcolor: '#1a1a1a', py: 1.5, borderRadius: '50px', fontWeight: 800 }}
                        >
                            KAYIT OL
                        </Button>
                    </form>
                </Paper>

                {/* BAŞARI BİLDİRİMİ (SNACKBAR) */}
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={() => setOpenSnackbar(false)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert severity="success" variant="filled" sx={{ width: '100%', borderRadius: '10px', bgcolor: '#2e7d32' }}>
                        Kayıt işlemi başarılı! Giriş sayfasına yönlendiriliyorsunuz...
                    </Alert>
                </Snackbar>
            </Container>
        </Fade>
    );
}

export default Register;