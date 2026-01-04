import React from 'react';
import { Box, Container, Typography, Grid, Link, Stack } from '@mui/material';

function Footer() {
    return (
        // Sayfanın en altındaki footer alanı
        <Box sx={{ bgcolor: '#1a1a1a', color: 'white', py: 8, mt: 10 }}>
            <Container maxWidth="lg">
                {/* Footer içeriğini 3 kolona bölen grid yapı */}
                <Grid container spacing={4}>

                    {/* Marka ve kısa açıklama bölümü */}
                    <Grid item xs={12} md={4}>
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 900, fontFamily: 'serif', mb: 2 }}
                        >
                            BOUTIQUE<span style={{ color: "#f7d1d1" }}>.</span>
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                            Elegance and style meet where. Complete your style with our most exclusive collections.
                        </Typography>
                    </Grid>

                    {/* Kategori linklerinin bulunduğu bölüm */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                            Categories
                        </Typography>
                        <Stack spacing={1}>
                            <Link href="#" color="inherit" underline="none" sx={{ opacity: 0.7 }}>
                                Upper Body
                            </Link>
                            <Link href="#" color="inherit" underline="none" sx={{ opacity: 0.7 }}>
                                Lower Body
                            </Link>
                            <Link href="#" color="inherit" underline="none" sx={{ opacity: 0.7 }}>
                                Accessories
                            </Link>
                        </Stack>
                    </Grid>

                    {/* İletişim bilgileri alanı */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                            Communication
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                            Email: info@boutique.com
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                            Adress: Nişantaşı, İstanbul
                        </Typography>
                    </Grid>
                </Grid>

                {/* Alt telif hakkı satırı */}
                <Box
                    sx={{
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        mt: 5,
                        pt: 3,
                        textAlign: 'center'
                    }}
                >
                    <Typography variant="caption" sx={{ opacity: 0.5 }}>
                        © 2025 Boutique. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}

export default Footer;
