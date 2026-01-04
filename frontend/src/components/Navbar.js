import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Badge,
    IconButton,
    Box,
    Container,
    InputBase,
    Fade,
    Menu,
    MenuItem,
    Button,
    Divider,
    Stack
} from '@mui/material';
import {
    ShoppingBagOutlined,
    Menu as MenuIcon,
    SearchOutlined,
    Close as CloseIcon,
    PersonOutline,
    FavoriteBorderOutlined // Kalp ikonu için bunu ekledim
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext'; // Favori sayısını takip etmek için ekledim

function Navbar({ onMenuClick }) {

    // Sayfa yönlendirmeleri için router hook
    const navigate = useNavigate();

    // Sepet, kullanıcı ve favori bilgileri context’ten alınır
    const { cartItems } = useCart();
    const { user, logout } = useAuth();
    const { favorites } = useFavorites(); // Favori listesini buradan çekiyoruz

    // Navbar içi state’ler
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);

    // Sepetteki toplam ürün sayısı
    const cart = cartItems || [];
    const itemCount = cart.reduce(
        (total, item) => total + (item.quantity || 1),
        0
    );

    // Arama Enter ile çalışır
    const handleSearchSubmit = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            navigate(`/?search=${searchQuery.trim()}`);
            setIsSearchOpen(false);
            setSearchQuery("");
        }
    };

    // Profil menüsü aç / kapat
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    return (
        // Sayfa kayarken üstte sabit kalan navbar
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(0,0,0,0.05)",
                py: 0.5,
                zIndex: 1100
            }}
        >
            <Container maxWidth="xl">
                <Toolbar
                    sx={{
                        justifyContent: "space-between",
                        px: "0 !important",
                        position: 'relative'
                    }}
                >

                    {/* SOL KISIM: DRAWER MENÜ BUTONU */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            opacity: isSearchOpen ? 0.3 : 1,
                            transition: '0.3s'
                        }}
                    >
                        <IconButton onClick={onMenuClick} sx={{ color: "#1a1a1a", mr: 1 }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="button"
                            sx={{
                                display: { xs: 'none', md: 'block' },
                                fontWeight: 700,
                                color: "#1a1a1a",
                                letterSpacing: 1
                            }}
                        >
                            Menü
                        </Typography>
                    </Box>

                    {/* ORTA KISIM: LOGO / ARAMA ALANI */}
                    <Box
                        sx={{
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: isSearchOpen ? { xs: '60%', md: '40%' } : 'auto',
                            transition: 'all 0.4s ease'
                        }}
                    >
                        {!isSearchOpen ? (
                            // Logo
                            <Typography
                                variant="h4"
                                onClick={() => navigate('/')}
                                sx={{
                                    fontWeight: 900,
                                    color: "#1a1a1a",
                                    cursor: 'pointer',
                                    letterSpacing: -1.5,
                                    fontSize: { xs: "1.5rem", md: "2.2rem" },
                                    fontFamily: "'Playfair Display', serif",
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                BOUTIQUE<span style={{ color: "#f7d1d1" }}>.</span>
                            </Typography>
                        ) : (
                            // Açılan arama çubuğu
                            <Fade in={isSearchOpen}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        bgcolor: '#f8f8f8',
                                        borderRadius: '50px',
                                        px: 2,
                                        py: 0.5,
                                        border: '1px solid #eee'
                                    }}
                                >
                                    <InputBase
                                        autoFocus
                                        fullWidth
                                        placeholder="Search the collection..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyPress={handleSearchSubmit}
                                        sx={{ ml: 1, fontWeight: 600, fontSize: '0.9rem' }}
                                    />
                                    <IconButton
                                        size="small"
                                        onClick={() => setIsSearchOpen(false)}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Fade>
                        )}
                    </Box>

                    {/* SAĞ KISIM: ARAMA, KULLANICI, SEPET */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: { xs: 0.5, md: 1.5 }
                        }}
                    >
                        {/* Arama ikonu */}
                        {!isSearchOpen && (
                            <IconButton
                                onClick={() => setIsSearchOpen(true)}
                                sx={{ color: "#1a1a1a" }}
                            >
                                <SearchOutlined />
                            </IconButton>
                        )}

                        {/* FAVORİ İKONU: Arama ve Profil/Giriş arasına ekledim */}
                        <IconButton
                            onClick={() => navigate('/favorites')}
                            sx={{ color: "#1a1a1a" }}
                        >
                            <Badge
                                badgeContent={favorites.length}
                                sx={{
                                    "& .MuiBadge-badge": {
                                        backgroundColor: "#d9644a",
                                        color: "#fff",
                                        fontWeight: 800
                                    }
                                }}
                            >
                                <FavoriteBorderOutlined />
                            </Badge>
                        </IconButton>

                        {/* KULLANICI GİRİŞ DURUMU */}
                        {user ? (
                            <>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={0.5}
                                    onClick={handleMenuOpen}
                                    sx={{
                                        cursor: 'pointer',
                                        '&:hover': { opacity: 0.7 }
                                    }}
                                >
                                    <PersonOutline sx={{ color: "#1a1a1a" }} />
                                    <Typography
                                        sx={{
                                            fontWeight: 800,
                                            fontSize: '0.8rem',
                                            display: { xs: 'none', sm: 'block' },
                                            color: '#1a1a1a'
                                        }}
                                    >
                                        {/* Kullanıcı adı yoksa email başı gösterilir */}
                                        {(user?.name ||
                                            user?.email?.split('@')[0] ||
                                            "PROFİL").toUpperCase()}
                                    </Typography>
                                </Stack>

                                {/* Açılır profil menüsü */}
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                    PaperProps={{
                                        sx: {
                                            borderRadius: '15px',
                                            mt: 1.5,
                                            minWidth: 180,
                                            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                                            border: '1px solid #f0f0f0'
                                        }
                                    }}
                                >
                                    <Box sx={{ px: 2, py: 1 }}>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontWeight: 800,
                                                color: 'text.secondary',
                                                display: 'block'
                                            }}
                                        >
                                            WELCOME
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                            {user?.name || user?.email}
                                        </Typography>
                                    </Box>

                                    <Divider />

                                    <MenuItem
                                        onClick={() => {
                                            navigate('/orders');
                                            handleMenuClose();
                                        }}
                                        sx={{ fontSize: '0.9rem', py: 1.5 }}
                                    >
                                        My Orders
                                    </MenuItem>

                                    <MenuItem
                                        onClick={() => {
                                            logout();
                                            handleMenuClose();
                                        }}
                                        sx={{
                                            color: '#d9644a',
                                            fontSize: '0.9rem',
                                            fontWeight: 600,
                                            py: 1.5
                                        }}
                                    >
                                        Çıkış Yap
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            // Giriş yapılmamışsa gösterilen buton
                            <Button
                                onClick={() => navigate('/login')}
                                sx={{
                                    color: '#1a1a1a',
                                    fontWeight: 800,
                                    fontSize: '0.8rem',
                                    letterSpacing: 1
                                }}
                            >
                                GİRİŞ
                            </Button>
                        )}

                        {/* Sepet ikonu */}
                        <IconButton
                            onClick={() => navigate('/cart')}
                            sx={{ color: "#1a1a1a" }}
                        >
                            <Badge
                                badgeContent={itemCount}
                                sx={{
                                    "& .MuiBadge-badge": {
                                        backgroundColor: "#f7d1d1",
                                        color: "#1a1a1a",
                                        fontWeight: 800
                                    }
                                }}
                            >
                                <ShoppingBagOutlined />
                            </Badge>
                        </IconButton>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;