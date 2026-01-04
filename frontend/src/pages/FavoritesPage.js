import { Container, Typography, Grid, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import ProductCard from '../components/ProductCard';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function FavoritesPage() {
    const { favorites } = useFavorites();
    const navigate = useNavigate();

    return (
        <Container sx={{ py: 15 }}>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 6, fontFamily: 'serif' }}>
                My Favorites
            </Typography>

            {favorites.length === 0 ? (
                // Favori listesi boşsa burası çalışır
                <Box sx={{ textAlign: 'center', py: 10 }}>
                    <FavoriteBorderIcon sx={{ fontSize: 80, color: '#eee', mb: 2 }} />
                    <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
                        You haven't added any products to your favorites yet..
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/')}
                        sx={{ bgcolor: '#1a1a1a', borderRadius: '50px', px: 4 }}
                    >
                        START EXPLORING
                    </Button>
                </Box>
            ) : (
                // Favori ürünleri grid şeklinde listeliyoruz
                <Grid container spacing={4}>
                    {favorites.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}

export default FavoritesPage;