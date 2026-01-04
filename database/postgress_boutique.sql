-- 1. Eski tabloyu sil ve temiz bir sayfa aç
DROP TABLE IF EXISTS products;

-- 2. Tabloyu oluştur
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    main_category VARCHAR(100) NOT NULL,
    sub_category VARCHAR(100) NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    image_url VARCHAR(255)
);

-- 3. DataLoader verilerini PostgreSQL formatında yükle
INSERT INTO products (name, main_category, sub_category, price, image_url) VALUES
-- KAZAK (Üst Giyim) - Başlangıç: 669.99
('V Yaka Çizgili Kazak', 'Üst Giyim', 'Kazak', 669.99, '/images/kazak-1.jpg'),
('Bebe Mavisi Büzgülü Crop Kazak', 'Üst Giyim', 'Kazak', 684.99, '/images/kazak-2.jpg'),
('Düğmeli Yakalı Triko Kazak', 'Üst Giyim', 'Kazak', 699.99, '/images/kazak-3.jpg'),
('Boğazlı Oversize Gri Kazak', 'Üst Giyim', 'Kazak', 714.99, '/images/kazak-4.jpg'),
('Oversize Örgü Desenli Bej Kazak', 'Üst Giyim', 'Kazak', 729.99, '/images/kazak5.jpg'),
('Oversize Örgü Desenli Bordo Kazak', 'Üst Giyim', 'Kazak', 744.99, '/images/kazak-6.jpg'),

-- TIŞÖRT (Üst Giyim) - Başlangıç: 450.0
('Yarasa Kol Kahverengi Basic Tişört', 'Üst Giyim', 'Tişört', 450.0, '/images/tisört1.jpg'),
('Füme Renk Vintage Wash Oversize Tişört', 'Üst Giyim', 'Tişört', 465.0, '/images/tisört2.jpg'),
('Wrangler Logolu Mor Retro Tişört', 'Üst Giyim', 'Tişört', 480.0, '/images/tisört3.jpg'),
('Don''t Stop The Music Baskılı Beyaz Tişört', 'Üst Giyim', 'Tişört', 495.0, '/images/tisört4.jpg'),
('Born To Be Free Yazılı Siyah Tişört', 'Üst Giyim', 'Tişört', 510.0, '/images/tisört5.jpg'),
('Expectation Sloganlı Kahverengi Tişört', 'Üst Giyim', 'Tişört', 525.0, '/images/tisört6.jpg'),

-- TUNİK (Üst Giyim) - Başlangıç: 850.0
('Kahverengi Yaka Detaylı Tunik', 'Üst Giyim', 'Tunik', 850.0, '/images/tunik1.jpg'),
('Yakalı Yeşil Örme Tunik', 'Üst Giyim', 'Tunik', 865.0, '/images/tunik2.jpg'),
('Balıkçı Yaka Örme Tunik', 'Üst Giyim', 'Tunik', 880.0, '/images/tunik3.jpg'),
('V Yaka Yeşil Tunik', 'Üst Giyim', 'Tunik', 895.0, '/images/tunik4.jpg'),
('Krem Gömlek Tunik', 'Üst Giyim', 'Tunik', 910.0, '/images/tunik5.jpg'),
('Beyaz Gömlek Tunik', 'Üst Giyim', 'Tunik', 925.0, '/images/tunik6.jpg'),

-- ETEK (Alt Giyim) - Başlangıç: 850.0
('Bilek Boy Kahverengi Kot Etek', 'Alt Giyim', 'Etek', 850.0, '/images/etek1.jpg'),
('Midi Boy Krem Etek', 'Alt Giyim', 'Etek', 865.0, '/images/etek2.jpg'),
('Bilek Boy Siyah Etek', 'Alt Giyim', 'Etek', 880.0, '/images/etek3.jpg'),
('Gri Desenli Beli Lastikli Rahat Kesim Etek', 'Alt Giyim', 'Etek', 895.0, '/images/etek4.jpg'),
('Bordo Saten Etek', 'Alt Giyim', 'Etek', 910.0, '/images/etek5.jpg'),
('Gri Pileli Saten Etek', 'Alt Giyim', 'Etek', 925.0, '/images/etek6.jpg'),

-- PANTOLON (Alt Giyim) - Başlangıç: 950.0
('Yüksek Bel Kruvaze Detaylı Siyah Pantolon', 'Alt Giyim', 'Pantolon', 950.0, '/images/pantolon1.jpg'),
('Sarı Kargo Pantolon', 'Alt Giyim', 'Pantolon', 965.0, '/images/pantolon2.jpg'),
('Gül Kurusu Yüksek Bel Klasik Kumaş Pantolon', 'Alt Giyim', 'Pantolon', 980.0, '/images/pantolon3.jpg'),
('Beyaz İspanyol Paça Pantolon', 'Alt Giyim', 'Pantolon', 995.0, '/images/pantolon4.jpg'),
('Leopar Desenli Yüksek Bel Jean Pantolon', 'Alt Giyim', 'Pantolon', 1010.0, '/images/pantolon5.jpg'),
('Bağcıklı Beli Lastikli Rahat Kesim Jean', 'Alt Giyim', 'Pantolon', 1025.0, '/images/pantolon6.jpg'),

-- ELBİSE (Tek Parça) - Başlangıç: 1250.0
('V Yaka Siyah Elbise', 'Tek Parça', 'Elbise', 1250.0, '/images/elbise1.jpg'),
('Kahverengi Yarımkol Gömlek Elbise', 'Tek Parça', 'Elbise', 1265.0, '/images/elbise2.jpg'),
('Mavi Çizgili Elbise', 'Tek Parça', 'Elbise', 1280.0, '/images/elbise3.jpg'),
('Kırmızı Krem Gömlek Elbise', 'Tek Parça', 'Elbise', 1295.0, '/images/elbise4.jpg'),
('Kahverengi Triko Elbise', 'Tek Parça', 'Elbise', 1310.0, '/images/elbise5.jpg'),
('Lacivert Basic Elbise', 'Tek Parça', 'Elbise', 1325.0, '/images/elbise6.jpg'),

-- KABAN (Dış Giyim) - Başlangıç: 2450.0
('Panço Kaban - Gri', 'Dış Giyim', 'Kaban', 2450.0, '/images/kaban-1.jpg'),
('Kahverengi Deri İçi Yünlü Kaban', 'Dış Giyim', 'Kaban', 2465.0, '/images/kaban-2.jpg'),
('Düğme Detaylı Yeşil Kaban', 'Dış Giyim', 'Kaban', 2480.0, '/images/kaban-3.jpg'),
('Düğme Detaylı Bej Kaban', 'Dış Giyim', 'Kaban', 2495.0, '/images/kaban-4.jpg'),
('Kuşaklı Gri Kaban', 'Dış Giyim', 'Kaban', 2510.0, '/images/kaban-5.jpg'),
('Düğme Detaylı Kahverengi Kaban', 'Dış Giyim', 'Kaban', 2525.0, '/images/kaban-6.jpg'),

-- GÖMLEK (Üst Giyim) - Başlangıç: 750.0
('Mavi Renkli Figür Nakışlı Gömlek', 'Üst Giyim', 'Gömlek', 750.0, '/images/gÖmlek1.jpg'),
('Kiremit Rengi Klasik Kesim Gömlek', 'Üst Giyim', 'Gömlek', 765.0, '/images/gömlek2.jpg'),
('Beyaz Çiçek Nakışlı Dik Yaka Gömlek', 'Üst Giyim', 'Gömlek', 780.0, '/images/gömlek3.jpg'),
('Mürdüm Desenli Oversize Gömlek', 'Üst Giyim', 'Gömlek', 795.0, '/images/gömlek4.jpg'),
('Altın Düğme Detaylı Beyaz Gömlek', 'Üst Giyim', 'Gömlek', 810.0, '/images/gömlek5.jpg'),
('Pembe Çizgili Klasik Pamuklu Gömlek', 'Üst Giyim', 'Gömlek', 825.0, '/images/gömlek6.jpg'),

-- SPOR AYAKKABI (Ayakkabı) - Başlangıç: 1450.0
('Sarı Detaylı Gri Patchwork Sneaker', 'Ayakkabı', 'Spor Ayakkabı', 1450.0, '/images/spor1.jpg'),
('Beyaz Chunky Kalın Tabanlı Spor Ayakkabı', 'Ayakkabı', 'Spor Ayakkabı', 1465.0, '/images/spor2.jpg'),
('Mavi Denim Dokulu Parlak Sneaker', 'Ayakkabı', 'Spor Ayakkabı', 1480.0, '/images/spor3.jpg'),
('Yıldız Nakışlı Mavi Beyaz Spor Ayakkabı', 'Ayakkabı', 'Spor Ayakkabı', 1495.0, '/images/spor4.jpg'),
('Kalp Desenli Kırmızı Bağcıklı Love Sneaker', 'Ayakkabı', 'Spor Ayakkabı', 1510.0, '/images/spor5.jpg'),
('Bej Detaylı Klasik Beyaz Deri Sneaker', 'Ayakkabı', 'Spor Ayakkabı', 1525.0, '/images/spor6.jpg'),

-- ÇANTA (Aksesuar) - Başlangıç: 1250.0
('Bej Deri Minimalist Kol Çantası', 'Aksesuar', 'Çanta', 1250.0, '/images/çanta1.jpg'),
('Taba Rengi Örgü Dokulu Salaş Çanta', 'Aksesuar', 'Çanta', 1265.0, '/images/çanta2.jpg'),
('Bebek Mavisi Klasik El Çantası', 'Aksesuar', 'Çanta', 1280.0, '/images/çanta3.jpg'),
('Kindness Yazılı Kanvas Omuz Çantası', 'Aksesuar', 'Çanta', 1295.0, '/images/çanta4.jpg'),
('Etnik Desenli Renkli Portföy Çanta', 'Aksesuar', 'Çanta', 1310.0, '/images/çanta5.jpg'),
('Çiçek Detaylı Hasır El Sepeti', 'Aksesuar', 'Çanta', 1325.0, '/images/çanta6.jpg'),

-- MONT (Dış Giyim) - Başlangıç: 1850.0
('Bebe Mavisi Dik Yaka Spor Mont', 'Dış Giyim', 'Mont', 1850.0, '/images/mont1.jpg'),
('Haki Renk Dik Yaka Spor Mont', 'Dış Giyim', 'Mont', 1865.0, '/images/mont2.jpg'),
('Yeşil Kadife Şişme Mont', 'Dış Giyim', 'Mont', 1880.0, '/images/mont3.jpg'),
('Parlak Koyu Yeşil Şişme Mont', 'Dış Giyim', 'Mont', 1895.0, '/images/mont4.jpg'),
('Lacivert Kadife Şişme Mont', 'Dış Giyim', 'Mont', 1910.0, '/images/mont5.jpg'),
('Bej Renk Kapüşonlu Kısa Şişme Mont', 'Dış Giyim', 'Mont', 1925.0, '/images/mont6.jpg'),

-- TULUM (Tek Parça) - Başlangıç: 1650.0
('Gri Keten Kruvaze Tulum', 'Tek Parça', 'Tulum', 1650.0, '/images/tulum1.jpg'),
('Mavi Kemerli Yarımkol Rahat Kesim Tulum', 'Tek Parça', 'Tulum', 1665.0, '/images/tulum2.jpg'),
('Safari Stil Kemerli Toprak Tulum', 'Tek Parça', 'Tulum', 1680.0, '/images/tulum3.jpg'),
('V Yaka Desenli Şifon Tulum', 'Tek Parça', 'Tulum', 1695.0, '/images/tulum4.jpg'),
('Mavi Yandan Bağlamalı Tulum', 'Tek Parça', 'Tulum', 1710.0, '/images/tulum5.jpg'),
('Yeşil Yandan Bağlamalı Tulum', 'Tek Parça', 'Tulum', 1725.0, '/images/tulum6.jpg'),

-- BOT (Ayakkabı) - Başlangıç: 2250.0
('Lacivert Deri El Yapımı Bağcıklı Bot', 'Ayakkabı', 'Bot', 2250.0, '/images/bot1.jpg'),
('Siyah Fermuarlı ve Bağcıklı Kadın Bot', 'Ayakkabı', 'Bot', 2265.0, '/images/bot2.jpg'),
('Krem Fermuarlı ve Bağcıklı Kadın Bot', 'Ayakkabı', 'Bot', 2280.0, '/images/bot3.jpg'),
('Süet Dikişli Troklu Lacivert Bot', 'Ayakkabı', 'Bot', 2295.0, '/images/bot4.jpg'),
('Taba Süet Bağcıklı Kadın Bot', 'Ayakkabı', 'Bot', 2310.0, '/images/bot5.jpg'),
('Acı Kahve Topuklu Deri Kadın Bot', 'Ayakkabı', 'Bot', 2325.0, '/images/bot6.jpg'),

-- ŞAL (Aksesuar) - Başlangıç: 350.0
('Etnik Desenli Lacivert Şal', 'Aksesuar', 'Şal', 350.0, '/images/sal-5.jpg'),
('Mürdüm Modal Şal', 'Aksesuar', 'Şal', 365.0, '/images/sal-4.jpg'),
('Floral Monogram Şal', 'Aksesuar', 'Şal', 380.0, '/images/sal-3.jpg'),
('Vual Crash Mavi Şal', 'Aksesuar', 'Şal', 395.0, '/images/sal-1.jpg'),
('Deluxe Desenli Şal', 'Aksesuar', 'Şal', 410.0, '/images/sal-6.jpg'),
('Desenli Lacivert Günlük Şal', 'Aksesuar', 'Şal', 425.0, '/images/sal-2.jpg'),

-- BABET VE SANDALET (Ayakkabı) - Başlangıç: 1150.0
('Siyah Burunlu Klasik Ekru Babet', 'Ayakkabı', 'Babet/Sandalet', 1150.0, '/images/babet1.jpg'),
('Mavi Örgü Dokulu Mary Jane Babet', 'Ayakkabı', 'Babet/Sandalet', 1165.0, '/images/babet2.jpg'),
('Altın Zincir Tokalı Bej Loafer Babet', 'Ayakkabı', 'Babet/Sandalet', 1180.0, '/images/babet3.jpg'),
('Gümüş Taşlı Bantlı Konfor Sandalet', 'Ayakkabı', 'Babet/Sandalet', 1195.0, '/images/babet4.jpg'),
('Çapraz Bantlı Günlük Vizon Sandalet', 'Ayakkabı', 'Babet/Sandalet', 1210.0, '/images/babet5.jpg'),
('Lame Detaylı Deri İnce Bantlı Sandalet', 'Ayakkabı', 'Babet/Sandalet', 1225.0, '/images/babet6.jpg');