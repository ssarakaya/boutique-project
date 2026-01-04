import {
    Drawer,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItemButton,
    ListItemText,
    Typography,
    Divider,
    IconButton,
    Avatar, // Alt kategorilerde thumbnail minik resim için
    Paper,  //  Haftanın ürünü kartı için
    Button  //  Haftanın ürünü butonu için
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom"; //  Ürüne yönlendirme yapmak için

// ---  İKONLARIN IMPORT EDİLMESİ ---
import CheckroomIcon from '@mui/icons-material/Checkroom'; // Üst Giyim
import LayersIcon from '@mui/icons-material/Layers'; // Alt Giyim
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew'; // Tek Parça
import AcUnitIcon from '@mui/icons-material/AcUnit'; // Dış Giyim
import RollerSkatingIcon from '@mui/icons-material/RollerSkating'; // Ayakkabı
import LocalMallIcon from '@mui/icons-material/LocalMall'; // Aksesuar

// Ana kategoriler ve bunlara ait alt kategoriler
const categories = {
    "Upper Body": ["Sweater", "T-Shirt", "Tunic", "Shirt"],
    "Lower Body": ["Trousers", "Skirt"],
    "One Piece": ["Dress", "Jumpsuit"],
    "Outerwear": ["Jacket", "Coat"],
    "Footwear": ["Sneakers", "Boots", "Flats/Sandals"],
    "Accessories": ["Bag", "Shawl"]
};

// --- STEP 1: CATEGORY CONFIGURATION (Icons and Sample Images) ---
const categoryConfig = {
    "Upper Body": { icon: <CheckroomIcon />, img: "/images/kazak-1.jpg" },
    "Lower Body": { icon: <LayersIcon />, img: "/images/pantolon1.jpg" },
    "One Piece": { icon: <AccessibilityNewIcon />, img: "/images/elbise1.jpg" },
    "Outerwear": { icon: <AcUnitIcon />, img: "/images/mont1.jpg" },
    "Footwear": { icon: <RollerSkatingIcon />, img: "/images/babet1.jpg" },
    "Accessories": { icon: <LocalMallIcon />, img: "/images/sal-4.jpg" },
};

function CategoryDrawer({ open, onClose, setMainCategory, setSubCategory }) {
    const navigate = useNavigate(); // Yönlendirme hook'u

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: { xs: '100%', sm: 320 },
                    backgroundColor: "#fff8f3",
                    borderRight: "none",
                    boxShadow: "10px 0 40px rgba(0,0,0,0.05)",
                    display: 'flex',
                    flexDirection: 'column' // Kartı en alta itmek için flex kullanıyoruz
                },
            }}
        >
            {/* Menü başlığı alanı */}
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: "0.1em", color: "#3b3b3b" }}>
                    MENU
                </Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <Divider sx={{ mb: 2, opacity: 0.5 }} />

            {/* Kategori listesi alanı */}
            <Box sx={{ px: 2, flexGrow: 1, overflowY: 'auto' }}>
                <Typography
                    variant="overline"
                    sx={{ px: 2, fontWeight: 700, color: "#d9644a", mb: 2, display: 'block' }}
                >
                    COLLECTIONS
                </Typography>

                {Object.entries(categories).map(([mainCat, subs]) => (
                    <Accordion
                        key={mainCat}
                        elevation={0}
                        sx={{
                            backgroundColor: "transparent",
                            "&:before": { display: "none" },
                            mb: 0.5
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{ color: "#d9644a" }} />}
                            sx={{
                                borderRadius: 2,
                                "&:hover": { backgroundColor: "rgba(217,100,74,0.05)" },
                                "&.Mui-expanded": { minHeight: 48 }
                            }}
                        >
                            {/* ADIM 1: Ana kategori ismi yanına ikon ekleme */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Box sx={{ color: "#d9644a", display: 'flex', fontSize: '1.2rem' }}>
                                    {categoryConfig[mainCat]?.icon}
                                </Box>
                                <Typography sx={{ fontWeight: 600, color: "#3b3b3b" }}>
                                    {mainCat}
                                </Typography>
                            </Box>
                        </AccordionSummary>

                        <AccordionDetails sx={{ p: 0 }}>
                            <List disablePadding>
                                {subs.map((sub) => (
                                    <ListItemButton
                                        key={sub}
                                        onClick={() => {
                                            setMainCategory(mainCat);
                                            setSubCategory(sub);
                                            onClose();
                                        }}
                                        sx={{
                                            pl: 4, py: 1, borderRadius: 2,
                                            "&:hover": { color: "#d9644a", backgroundColor: "transparent" }
                                        }}
                                    >
                                        {/* ADIM 1: Alt kategori yanına minik yuvarlak resim (Thumbnail) */}
                                        <Avatar
                                            src={categoryConfig[mainCat]?.img}
                                            sx={{ width: 22, height: 22, mr: 1.5, border: '1px solid #eee' }}
                                        />
                                        <ListItemText
                                            primary={sub}
                                            primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 500 }}
                                        />
                                    </ListItemButton>
                                ))}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                ))}

                <ListItemButton
                    onClick={() => {
                        setMainCategory(null);
                        setSubCategory(null);
                        onClose();
                    }}
                    sx={{ mt: 2, borderRadius: 2, backgroundColor: "rgba(59,59,59,0.03)" }}
                >
                    <ListItemText
                        primary="See All"
                        primaryTypographyProps={{ fontWeight: 700, textAlign: 'center' }}
                    />
                </ListItemButton>
            </Box>

            {/* --- ADIM 2: ÖNE ÇIKAN ÜRÜN KARTI (Drawer en altı) --- */}
            <Box sx={{ p: 3, mt: 'auto' }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 2.5,
                        bgcolor: '#1a1a1a',
                        color: '#fff',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        overflow: 'hidden',
                        position: 'relative',
                        transition: 'transform 0.3s',
                        '&:hover': { transform: 'translateY(-5px)' }
                    }}
                    onClick={() => { navigate('/product/80'); onClose(); }} // Örnek ID: 20 (Mürdüm Şal)
                >
                    <Box sx={{ position: 'relative', zIndex: 2 }}>
                        <Typography variant="caption" sx={{ color: '#f7d1d1', fontWeight: 800, letterSpacing: 1.5 }}>
                            Favorite of The Week
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 800, mt: 0.5, mb: 1.5, fontFamily: 'serif' }}>
                            Plum Modal Şawl
                        </Typography>
                        <Button
                            variant="text"
                            size="small"
                            sx={{ color: '#f7d1d1', p: 0, fontWeight: 700, fontSize: '0.75rem' }}
                        >
                            CHECK IT OUT NOW →
                        </Button>
                    </Box>

                    {/* Arka plandaki silüet görsel katmanı */}
                    <Box
                        component="img"
                        src="/images/sal-4.jpg"
                        sx={{
                            position: 'absolute', right: -15, top: 0, height: '100%',
                            width: '45%', objectFit: 'cover', opacity: 0.35,
                            filter: 'grayscale(100%)', zIndex: 1
                        }}
                    />
                </Paper>
            </Box>
        </Drawer>
    );
}

export default CategoryDrawer;