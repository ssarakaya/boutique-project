package com.sarakaya.backend;

import com.sarakaya.backend.model.Product;
import com.sarakaya.backend.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final ProductRepository repository;

    public DataLoader(ProductRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (repository.count() == 0) {

            // SWEATER CATEGORY
            saveCategory("Sweater", "Upper Body", 669.99, new String[]{
                    "V-Neck Striped Sweater", "/images/kazak-1.jpg",
                    "Baby Blue Ruffled Crop Sweater", "/images/kazak-2.jpg",
                    "Buttoned Collar Knit Sweater", "/images/kazak-3.jpg",
                    "Oversized Grey Turtleneck Sweater", "/images/kazak-4.jpg",
                    "Oversized Beige Cable Knit Sweater", "/images/kazak5.jpg",
                    "Oversized Burgundy Cable Knit Sweater", "/images/kazak-6.jpg"
            });

// T-SHIRT CATEGORY
            saveCategory("T-Shirt", "Upper Body", 450.0, new String[]{
                    "Batwing Sleeve Brown Basic T-Shirt", "/images/tisört1.jpg",
                    "Smoky Vintage Wash Oversized T-Shirt", "/images/tisört2.jpg",
                    "Wrangler Logo Purple Retro T-Shirt", "/images/tisört3.jpg",
                    "Don't Stop The Music Printed White T-Shirt", "/images/tisört4.jpg",
                    "Born To Be Free Slogan Black T-Shirt", "/images/tisört5.jpg",
                    "Expectation Slogan Brown T-Shirt", "/images/tisört6.jpg"
            });

// TUNIK CATEGORY
            saveCategory("Tunic", "Upper Body", 850.0, new String[]{
                    "Brown Collar Detail Tunic", "/images/tunik1.jpg",
                    "Green Knit Collar Tunic", "/images/tunik2.jpg",
                    "High Neck Knit Tunic", "/images/tunik3.jpg",
                    "V-Neck Green Tunic", "/images/tunik4.jpg",
                    "Cream Shirt Tunic", "/images/tunik5.jpg",
                    "White Shirt Tunic", "/images/tunik6.jpg"
            });

// SKIRT CATEGORY
            saveCategory("Skirt", "Lower Body", 850.0, new String[]{
                    "Ankle Length Brown Denim Skirt", "/images/etek1.jpg",
                    "Midi Length Cream Skirt", "/images/etek2.jpg",
                    "Ankle Length Black Skirt", "/images/etek3.jpg",
                    "Grey Patterned Elastic Waist Relaxed Fit Skirt", "/images/etek4.jpg",
                    "Burgundy Satin Skirt", "/images/etek5.jpg",
                    "Grey Pleated Satin Skirt", "/images/etek6.jpg"
            });

// TROUSERS CATEGORY
            saveCategory("Trousers", "Lower Body", 950.0, new String[]{
                    "High Waist Double-Breasted Black Trousers", "/images/pantolon1.jpg",
                    "Yellow Cargo Pants", "/images/pantolon2.jpg",
                    "Dusty Rose High Waist Classic Fabric Trousers", "/images/pantolon3.jpg",
                    "White Flare Leg Trousers", "/images/pantolon4.jpg",
                    "Leopard Print High Waist Jean Trousers", "/images/pantolon5.jpg",
                    "Drawstring Elastic Waist Relaxed Fit Jeans", "/images/pantolon6.jpg"
            });

// DRESS CATEGORY
            saveCategory("Dress", "One Piece", 1250.0, new String[]{
                    "V-Neck Black Dress", "/images/elbise1.jpg",
                    "Brown Short Sleeve Shirt Dress", "/images/elbise2.jpg",
                    "Blue Striped Dress", "/images/elbise3.jpg",
                    "Red and Cream Shirt Dress", "/images/elbise4.jpg",
                    "Brown Knit Dress", "/images/elbise5.jpg",
                    "Navy Blue Basic Dress", "/images/elbise6.jpg"
            });

// COAT CATEGORY
            saveCategory("Coat", "Outerwear", 2450.0, new String[]{
                    "Grey Poncho Coat", "/images/kaban-1.jpg",
                    "Brown Leather Wool Lined Coat", "/images/kaban-2.jpg",
                    "Green Coat with Button Detail", "/images/kaban-3.jpg",
                    "Beige Coat with Button Detail", "/images/kaban-4.jpg",
                    "Grey Belted Coat", "/images/kaban-5.jpg",
                    "Brown Coat with Button Detail", "/images/kaban-6.jpg"
            });

// SHIRT CATEGORY
            saveCategory("Shirt", "Upper Body", 750.0, new String[]{
                    "Blue Shirt with Figure Embroidery", "/images/gÖmlek1.jpg",
                    "Brick Red Classic Fit Shirt", "/images/gömlek2.jpg",
                    "White Floral Embroidered High Neck Shirt", "/images/gömlek3.jpg",
                    "Damson Patterned Oversized Shirt", "/images/gömlek4.jpg",
                    "White Shirt with Gold Button Detail", "/images/gömlek5.jpg",
                    "Pink Striped Classic Cotton Shirt", "/images/gömlek6.jpg"
            });

// SNEAKERS CATEGORY
            saveCategory("Sneakers", "Footwear", 1450.0, new String[]{
                    "Grey Patchwork Sneaker with Yellow Details", "/images/spor1.jpg",
                    "White Chunky Sole Sneakers", "/images/spor2.jpg",
                    "Blue Denim Textured Shiny Sneaker", "/images/spor3.jpg",
                    "Blue and White Star Embroidered Sneaker", "/images/spor4.jpg",
                    "Red Lace-up Love Sneaker with Heart Pattern", "/images/spor5.jpg",
                    "Classic White Leather Sneaker with Beige Details", "/images/spor6.jpg"
            });

// BAG CATEGORY
            saveCategory("Bag", "Accessories", 1250.0, new String[]{
                    "Beige Leather Minimalist Shoulder Bag", "/images/çanta1.jpg",
                    "Tan Woven Textured Slouchy Bag", "/images/çanta2.jpg",
                    "Baby Blue Classic Handbag", "/images/çanta3.jpg",
                    "Kindness Printed Canvas Tote Bag", "/images/çanta4.jpg",
                    "Ethnic Patterned Colorful Clutch Bag", "/images/çanta5.jpg",
                    "Floral Detailed Straw Basket Bag", "/images/çanta6.jpg"
            });

// JACKET CATEGORY
            saveCategory("Puffer Jacket", "Outerwear", 1850.0, new String[]{
                    "Baby Blue High Neck Sporty Jacket", "/images/mont1.jpg",
                    "Khaki High Neck Sporty Jacket", "/images/mont2.jpg",
                    "Green Velvet Puffer Jacket", "/images/mont3.jpg",
                    "Shiny Dark Green Puffer Jacket", "/images/mont4.jpg",
                    "Navy Blue Velvet Puffer Jacket", "/images/mont5.jpg",
                    "Beige Short Hooded Puffer Jacket", "/images/mont6.jpg"
            });

// JUMPSUIT CATEGORY
            saveCategory("Jumpsuit", "One Piece", 1650.0, new String[]{
                    "Grey Linen Double-Breasted Jumpsuit", "/images/tulum1.jpg",
                    "Blue Belted Short Sleeve Relaxed Fit Jumpsuit", "/images/tulum2.jpg",
                    "Safari Style Belted Earth Tone Jumpsuit", "/images/tulum3.jpg",
                    "V-Neck Patterned Chiffon Jumpsuit", "/images/tulum4.jpg",
                    "Blue Side-Tie Jumpsuit", "/images/tulum5.jpg",
                    "Green Side-Tie Jumpsuit", "/images/tulum6.jpg"
            });

// BOOTS CATEGORY
            saveCategory("Boots", "Footwear", 2250.0, new String[]{
                    "Navy Blue Handmade Leather Lace-up Boots", "/images/bot1.jpg",
                    "Black Women's Boots with Zipper and Laces", "/images/bot2.jpg",
                    "Cream Women's Boots with Zipper and Laces", "/images/bot3.jpg",
                    "Navy Blue Suede Boots with Stud Detail", "/images/bot4.jpg",
                    "Tan Suede Lace-up Women's Boots", "/images/bot5.jpg",
                    "Dark Brown Heeled Leather Women's Boots", "/images/bot6.jpg"
            });

// SHAWL CATEGORY
            saveCategory("Shawl", "Accessories", 350.0, new String[]{
                    "Ethnic Patterned Navy Blue Shawl", "/images/sal-5.jpg",
                    "Damson Modal Shawl", "/images/sal-4.jpg",
                    "Floral Monogram Shawl", "/images/sal-3.jpg",
                    "Blue Voile Crash Shawl", "/images/sal-1.jpg",
                    "Deluxe Patterned Shawl", "/images/sal-6.jpg",
                    "Patterned Navy Blue Daily Shawl", "/images/sal-2.jpg"
            });

// FLATS AND SANDALS CATEGORY
            saveCategory("Flats/Sandals", "Footwear", 1150.0, new String[]{
                    "Classic Ecru Flats with Black Toe", "/images/babet1.jpg",
                    "Blue Woven Textured Mary Jane Flats", "/images/babet2.jpg",
                    "Beige Loafer Flats with Gold Chain Buckle", "/images/babet3.jpg",
                    "Silver Stone Strap Comfort Sandals", "/images/babet4.jpg",
                    "Cross Strap Daily Vison Sandals", "/images/babet5.jpg",
                    "Thin Strap Leather Sandals with Lame Detail", "/images/babet6.jpg"
            });

            System.out.println("Başarılı! 14 kategori ve 84 özel ürün yüklendi.");
        }
    }

    private void saveCategory(String subCategory, String mainCategory, Double basePrice, String[] data) {
        for (int i = 0; i < data.length; i += 2) {
            String name = data[i];
            String url = data[i+1];
            repository.save(new Product(name, mainCategory, subCategory, basePrice + (i * 15), url));
        }
    }
}
