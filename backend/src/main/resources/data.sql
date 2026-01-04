-- 1. Tabloyu Java Entity yapınla %100 uyumlu hale getiriyoruz
DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products (
                          id SERIAL PRIMARY KEY,
                          name VARCHAR(255) NOT NULL,
                          main_category VARCHAR(100),
                          sub_category VARCHAR(100),
                          price DOUBLE PRECISION,
                          image_url VARCHAR(255),
                          description VARCHAR(500) -- Hem main_category hem description dolu olmalı
);

-- 2. TÜM ÜRÜNLERİN
INSERT INTO products (name, main_category, sub_category, price, image_url, description) VALUES
-- SWEATERS
('V-Neck Striped Sweater', 'Upper Body', 'Sweater', 669.99, '/images/kazak-1.jpg', 'Upper Body'),
('Baby Blue Ruffled Crop Sweater', 'Upper Body', 'Sweater', 684.99, '/images/kazak-2.jpg', 'Upper Body'),
('Buttoned Collar Knit Sweater', 'Upper Body', 'Sweater', 699.99, '/images/kazak-3.jpg', 'Upper Body'),
('Oversized Grey Turtleneck Sweater', 'Upper Body', 'Sweater', 714.99, '/images/kazak-4.jpg', 'Upper Body'),
('Oversized Beige Cable Knit Sweater', 'Upper Body', 'Sweater', 729.99, '/images/kazak5.jpg', 'Upper Body'),
('Oversized Burgundy Cable Knit Sweater', 'Upper Body', 'Sweater', 744.99, '/images/kazak-6.jpg', 'Upper Body'),

-- T-SHIRTS
('Batwing Sleeve Brown Basic T-Shirt', 'Upper Body', 'T-Shirt', 450.0, '/images/tisört1.jpg', 'Upper Body'),
('Smoky Vintage Wash Oversized T-Shirt', 'Upper Body', 'T-Shirt', 465.0, '/images/tisört2.jpg', 'Upper Body'),
('Wrangler Logo Purple Retro T-Shirt', 'Upper Body', 'T-Shirt', 480.0, '/images/tisört3.jpg', 'Upper Body'),
('Don''t Stop The Music Printed White T-Shirt', 'Upper Body', 'T-Shirt', 495.0, '/images/tisört4.jpg', 'Upper Body'),
('Born To Be Free Slogan Black T-Shirt', 'Upper Body', 'T-Shirt', 510.0, '/images/tisört5.jpg', 'Upper Body'),
('Expectation Slogan Brown T-Shirt', 'Upper Body', 'T-Shirt', 525.0, '/images/tisört6.jpg', 'Upper Body'),

-- TUNICS
('Brown Collar Detail Tunic', 'Upper Body', 'Tunic', 850.0, '/images/tunik1.jpg', 'Upper Body'),
('Green Knit Collar Tunic', 'Upper Body', 'Tunic', 865.0, '/images/tunik2.jpg', 'Upper Body'),
('High Neck Knit Tunic', 'Upper Body', 'Tunic', 880.0, '/images/tunik3.jpg', 'Upper Body'),
('V-Neck Green Tunic', 'Upper Body', 'Tunic', 895.0, '/images/tunik4.jpg', 'Upper Body'),
('Cream Shirt Tunic', 'Upper Body', 'Tunic', 910.0, '/images/tunik5.jpg', 'Upper Body'),
('White Shirt Tunic', 'Upper Body', 'Tunic', 925.0, '/images/tunik6.jpg', 'Upper Body'),

-- SKIRTS
('Ankle Length Brown Denim Skirt', 'Lower Body', 'Skirt', 850.0, '/images/etek1.jpg', 'Lower Body'),
('Midi Length Cream Skirt', 'Lower Body', 'Skirt', 865.0, '/images/etek2.jpg', 'Lower Body'),
('Ankle Length Black Skirt', 'Lower Body', 'Skirt', 880.0, '/images/etek3.jpg', 'Lower Body'),
('Grey Patterned Elastic Waist Relaxed Fit Skirt', 'Lower Body', 'Skirt', 895.0, '/images/etek4.jpg', 'Lower Body'),
('Burgundy Satin Skirt', 'Lower Body', 'Skirt', 910.0, '/images/etek5.jpg', 'Lower Body'),
('Grey Pleated Satin Skirt', 'Lower Body', 'Skirt', 925.0, '/images/etek6.jpg', 'Lower Body'),

-- TROUSERS
('High Waist Double-Breasted Black Trousers', 'Lower Body', 'Trousers', 950.0, '/images/pantolon1.jpg', 'Lower Body'),
('Yellow Cargo Pants', 'Lower Body', 'Trousers', 965.0, '/images/pantolon2.jpg', 'Lower Body'),
('Dusty Rose High Waist Classic Fabric Trousers', 'Lower Body', 'Trousers', 980.0, '/images/pantolon3.jpg', 'Lower Body'),
('White Flare Leg Trousers', 'Lower Body', 'Trousers', 995.0, '/images/pantolon4.jpg', 'Lower Body'),
('Leopard Print High Waist Jean Trousers', 'Lower Body', 'Trousers', 1010.0, '/images/pantolon5.jpg', 'Lower Body'),
('Drawstring Elastic Waist Relaxed Fit Jeans', 'Lower Body', 'Trousers', 1025.0, '/images/pantolon6.jpg', 'Lower Body'),

-- DRESSES
('V-Neck Black Dress', 'One Piece', 'Dress', 1250.0, '/images/elbise1.jpg', 'One Piece'),
('Brown Short Sleeve Shirt Dress', 'One Piece', 'Dress', 1265.0, '/images/elbise2.jpg', 'One Piece'),
('Blue Striped Dress', 'One Piece', 'Dress', 1280.0, '/images/elbise3.jpg', 'One Piece'),
('Red and Cream Shirt Dress', 'One Piece', 'Dress', 1295.0, '/images/elbise4.jpg', 'One Piece'),
('Brown Knit Dress', 'One Piece', 'Dress', 1310.0, '/images/elbise5.jpg', 'One Piece'),
('Navy Blue Basic Dress', 'One Piece', 'Dress', 1325.0, '/images/elbise6.jpg', 'One Piece'),

-- COATS
('Grey Poncho Coat', 'Outerwear', 'Coat', 2450.0, '/images/kaban-1.jpg', 'Outerwear'),
('Brown Leather Wool Lined Coat', 'Outerwear', 'Coat', 2465.0, '/images/kaban-2.jpg', 'Outerwear'),
('Green Coat with Button Detail', 'Outerwear', 'Coat', 2480.0, '/images/kaban-3.jpg', 'Outerwear'),
('Beige Coat with Button Detail', 'Outerwear', 'Coat', 2495.0, '/images/kaban-4.jpg', 'Outerwear'),
('Grey Belted Coat', 'Outerwear', 'Coat', 2510.0, '/images/kaban-5.jpg', 'Outerwear'),
('Brown Coat with Button Detail', 'Outerwear', 'Coat', 2525.0, '/images/kaban-6.jpg', 'Outerwear'),

-- SHIRTS
('Blue Shirt with Figure Embroidery', 'Upper Body', 'Shirt', 750.0, '/images/gÖmlek1.jpg', 'Upper Body'),
('Brick Red Classic Fit Shirt', 'Upper Body', 'Shirt', 765.0, '/images/gömlek2.jpg', 'Upper Body'),
('White Floral Embroidered High Neck Shirt', 'Upper Body', 'Shirt', 780.0, '/images/gömlek3.jpg', 'Upper Body'),
('Damson Patterned Oversized Shirt', 'Upper Body', 'Shirt', 795.0, '/images/gömlek4.jpg', 'Upper Body'),
('White Shirt with Gold Button Detail', 'Upper Body', 'Shirt', 810.0, '/images/gömlek5.jpg', 'Upper Body'),
('Pink Striped Classic Cotton Shirt', 'Upper Body', 'Shirt', 825.0, '/images/gömlek6.jpg', 'Upper Body'),

-- SNEAKERS
('Grey Patchwork Sneaker with Yellow Details', 'Footwear', 'Sneakers', 1450.0, '/images/spor1.jpg', 'Footwear'),
('White Chunky Sole Sneakers', 'Footwear', 'Sneakers', 1465.0, '/images/spor2.jpg', 'Footwear'),
('Blue Denim Textured Shiny Sneaker', 'Footwear', 'Sneakers', 1480.0, '/images/spor3.jpg', 'Footwear'),
('Blue and White Star Embroidered Sneaker', 'Footwear', 'Sneakers', 1495.0, '/images/spor4.jpg', 'Footwear'),
('Red Lace-up Love Sneaker with Heart Pattern', 'Footwear', 'Sneakers', 1510.0, '/images/spor5.jpg', 'Footwear'),
('Classic White Leather Sneaker with Beige Details', 'Footwear', 'Sneakers', 1525.0, '/images/spor6.jpg', 'Footwear'),

-- BAGS
('Beige Leather Minimalist Shoulder Bag', 'Accessories', 'Bag', 1250.0, '/images/çanta1.jpg', 'Accessories'),
('Tan Woven Textured Slouchy Bag', 'Accessories', 'Bag', 1265.0, '/images/çanta2.jpg', 'Accessories'),
('Baby Blue Classic Handbag', 'Accessories', 'Bag', 1280.0, '/images/çanta3.jpg', 'Accessories'),
('Kindness Printed Canvas Tote Bag', 'Accessories', 'Bag', 1295.0, '/images/çanta4.jpg', 'Accessories'),
('Ethnic Patterned Colorful Clutch Bag', 'Accessories', 'Bag', 1310.0, '/images/çanta5.jpg', 'Accessories'),
('Floral Detailed Straw Basket Bag', 'Accessories', 'Bag', 1325.0, '/images/çanta6.jpg', 'Accessories'),

-- JACKETS
('Baby Blue High Neck Sporty Jacket', 'Outerwear', 'Jacket', 1850.0, '/images/mont1.jpg', 'Outerwear'),
('Khaki High Neck Sporty Jacket', 'Outerwear', 'Jacket', 1865.0, '/images/mont2.jpg', 'Outerwear'),
('Green Velvet Puffer Jacket', 'Outerwear', 'Jacket', 1880.0, '/images/mont3.jpg', 'Outerwear'),
('Shiny Dark Green Puffer Jacket', 'Outerwear', 'Jacket', 1895.0, '/images/mont4.jpg', 'Outerwear'),
('Navy Blue Velvet Puffer Jacket', 'Outerwear', 'Jacket', 1910.0, '/images/mont5.jpg', 'Outerwear'),
('Beige Short Hooded Puffer Jacket', 'Outerwear', 'Jacket', 1925.0, '/images/mont6.jpg', 'Outerwear'),

-- JUMPSUITS
('Grey Linen Double-Breasted Jumpsuit', 'One Piece', 'Jumpsuit', 1650.0, '/images/tulum1.jpg', 'One Piece'),
('Blue Belted Short Sleeve Relaxed Fit Jumpsuit', 'One Piece', 'Jumpsuit', 1665.0, '/images/tulum2.jpg', 'One Piece'),
('Safari Style Belted Earth Tone Jumpsuit', 'One Piece', 'Jumpsuit', 1680.0, '/images/tulum3.jpg', 'One Piece'),
('V-Neck Patterned Chiffon Jumpsuit', 'One Piece', 'Jumpsuit', 1695.0, '/images/tulum4.jpg', 'One Piece'),
('Blue Side-Tie Jumpsuit', 'One Piece', 'Jumpsuit', 1710.0, '/images/tulum5.jpg', 'One Piece'),
('Green Side-Tie Jumpsuit', 'One Piece', 'Jumpsuit', 1725.0, '/images/tulum6.jpg', 'One Piece'),

-- BOOTS
('Navy Blue Handmade Leather Lace-up Boots', 'Footwear', 'Boots', 2250.0, '/images/bot1.jpg', 'Footwear'),
('Black Women''s Boots with Zipper and Laces', 'Footwear', 'Boots', 2265.0, '/images/bot2.jpg', 'Footwear'),
('Cream Women''s Boots with Zipper and Laces', 'Footwear', 'Boots', 2280.0, '/images/bot3.jpg', 'Footwear'),
('Navy Blue Suede Boots with Stud Detail', 'Footwear', 'Boots', 2295.0, '/images/bot4.jpg', 'Footwear'),
('Tan Suede Lace-up Women''s Boots', 'Footwear', 'Boots', 2310.0, '/images/bot5.jpg', 'Footwear'),
('Dark Brown Heeled Leather Women''s Boots', 'Footwear', 'Boots', 2325.0, '/images/bot6.jpg', 'Footwear'),

-- SHAWLS
('Ethnic Patterned Navy Blue Shawl', 'Accessories', 'Shawl', 350.0, '/images/sal-5.jpg', 'Accessories'),
('Damson Modal Shawl', 'Accessories', 'Shawl', 365.0, '/images/sal-4.jpg', 'Accessories'),
('Floral Monogram Shawl', 'Accessories', 'Shawl', 380.0, '/images/sal-3.jpg', 'Accessories'),
('Blue Voile Crash Shawl', 'Accessories', 'Shawl', 395.0, '/images/sal-1.jpg', 'Accessories'),
('Deluxe Patterned Shawl', 'Accessories', 'Shawl', 410.0, '/images/sal-6.jpg', 'Accessories'),
('Patterned Navy Blue Daily Shawl', 'Accessories', 'Shawl', 425.0, '/images/sal-2.jpg', 'Accessories'),

-- FLATS/SANDALS
('Classic Ecru Flats with Black Toe', 'Footwear', 'Flats/Sandals', 1150.0, '/images/babet1.jpg', 'Footwear'),
('Blue Woven Textured Mary Jane Flats', 'Footwear', 'Flats/Sandals', 1165.0, '/images/babet2.jpg', 'Footwear'),
('Beige Loafer Flats with Gold Chain Buckle', 'Footwear', 'Flats/Sandals', 1180.0, '/images/babet3.jpg', 'Footwear'),
('Silver Stone Strap Comfort Sandals', 'Footwear', 'Flats/Sandals', 1195.0, '/images/babet4.jpg', 'Footwear'),
('Cross Strap Daily Vison Sandals', 'Footwear', 'Flats/Sandals', 1210.0, '/images/babet5.jpg', 'Footwear'),
('Thin Strap Leather Sandals with Lame Detail', 'Footwear', 'Flats/Sandals', 1225.0, '/images/babet6.jpg', 'Footwear');
-- TEST KULLANICISI
INSERT INTO users (email, password) VALUES ('test@test.com', '123456') ON CONFLICT DO NOTHING;