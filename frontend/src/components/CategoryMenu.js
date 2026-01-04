import { Drawer, Box, Accordion, AccordionSummary, AccordionDetails, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Menüde gösterilecek ana ve alt kategoriler
const categories = {
    "Upper Body": ["Sweater", "Tunic"],
    "Lower Body": ["Trousers", "Skirt"],
    "One Piece": ["Dress", "Jumpsuit"],
    "Footwear": ["Sneakers", "Boots", "Flats / Sandals"],
    "Accessories": ["Bag", "Shawl"],
};

function CategoryDrawer({ open, onClose, setMainCategory, setSubCategory }) {
    return (
        // Soldan açılan kategori drawer'ı
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: 280,
                    borderRadius: 3,
                    boxShadow: "0 16px 40px rgba(0,0,0,0.2)",
                    backdropFilter: "blur(8px)",
                    backgroundColor: "rgba(255, 248, 242, 0.95)",
                    transition: "transform 0.35s ease-in-out",
                    transform: open ? "translateX(0)" : "translateX(-100%)",
                    display: "flex",
                    flexDirection: "column",
                },
            }}
        >
            {/* Drawer üst başlık alanı */}
            <Box
                sx={{
                    p: 3,
                    borderBottom: "1px solid rgba(0,0,0,0.1)",
                    position: "sticky",
                    top: 0,
                    backgroundColor: "rgba(255,248,242,0.95)",
                    zIndex: 1
                }}
            >
                <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: "#d9644a", letterSpacing: "0.05em" }}
                >
                    Kategoriler
                </Typography>
            </Box>

            {/* Kategorilerin listelendiği scroll edilebilir alan */}
            <Box sx={{ p: 3, overflowY: "auto", flexGrow: 1 }}>
                {Object.entries(categories).map(([mainCat, subs]) => (
                    // Her ana kategori için accordion
                    <Accordion
                        key={mainCat}
                        elevation={0}
                        sx={{
                            mb: 1,
                            borderRadius: 2,
                            "&:before": { display: "none" },
                            transition: "all 0.3s ease",
                            "&:hover": { backgroundColor: "rgba(255,220,200,0.3)" },
                        }}
                    >
                        {/* Ana kategori başlığı */}
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{
                                backgroundColor: "rgba(255, 230, 210, 0.8)",
                                borderRadius: 2,
                                "& .MuiTypography-root": { fontWeight: 600, color: "#b33f2d" },
                            }}
                        >
                            <Typography>{mainCat}</Typography>
                        </AccordionSummary>

                        {/* Alt kategorilerin listesi */}
                        <AccordionDetails>
                            <List>
                                {subs.map((sub) => (
                                    <ListItemButton
                                        key={sub}
                                        onClick={() => {
                                            // Seçilen kategoriye göre filtreleme yap
                                            setMainCategory(mainCat);
                                            setSubCategory(sub);
                                            onClose();
                                        }}
                                        sx={{
                                            borderRadius: 2,
                                            mb: 1,
                                            "&:hover": { backgroundColor: "rgba(255,200,160,0.4)" },
                                        }}
                                    >
                                        <ListItemText
                                            primary={sub}
                                            sx={{ pl: 1, fontWeight: 500, color: "#6b3a2b" }}
                                        />
                                    </ListItemButton>
                                ))}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </Drawer>
    );
}

export default CategoryDrawer;
