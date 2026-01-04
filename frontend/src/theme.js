import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        background: {
            default: "#fdfcfa", // Daha lüks ve temiz bir fildişi tonu
        },
        primary: {
            main: "#1a1a1a", // Tam siyah yerine daha derin bir kömür siyahı
        },
        secondary: {
            main: "#d9644a", // Marka vurgu rengin
        },
        text: {
            primary: "#1a1a1a",
            secondary: "#555555",
        },
    },
    typography: {
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        h1: {
            fontSize: "4.5rem",
            fontWeight: 800,
            letterSpacing: "0.25em", // O sevdiğin genişlik dengelendi
            // textTransform kaldırıldı, böylece "ZARAFETİ" yazımı bozulmaz.
        },
        h6: {
            fontWeight: 800,
            letterSpacing: "0.02em",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "50px", // Tam oval hatlar daha profesyonel durur
                    textTransform: "none",
                    padding: "10px 28px",
                    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: "30px", // Daha yumuşak "premium" köşeler
                    boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                    border: "1px solid rgba(0,0,0,0.05)",
                    transition: "all 0.4s ease-in-out",
                    "&:hover": {
                        transform: "translateY(-12px)",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "rgba(253, 252, 250, 0.8)", // Cam efekti
                    backdropFilter: "blur(12px)",
                    color: "#1a1a1a",
                    boxShadow: "none",
                    borderBottom: "1px solid rgba(0,0,0,0.05)",
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    borderRadius: "0 30px 30px 0",
                    backgroundColor: "#fdfcfa",
                    border: "none",
                    boxShadow: "20px 0 50px rgba(0,0,0,0.05)",
                },
            },
        },
    },
});

export default theme;