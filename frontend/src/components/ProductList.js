import { Grid, Typography, Box } from "@mui/material";
import ProductCard from "./ProductCard";

function ProductList({ products }) {
    return (
        <>
            <Box sx={{ mb: 6 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    NEW COLLECTION
                </Typography>
                <Box
                    sx={{
                        width: 60,
                        height: 3,
                        backgroundColor: "#d9644a", // soft canlı renk
                        mt: 1,
                        borderRadius: 1,
                    }}
                />
            </Box>

            <Grid container spacing={4}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default ProductList;
