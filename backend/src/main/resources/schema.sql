-- 1. ADIM: TEMİZLİK VE TABLO OLUŞTURMA
-- Eğer daha önceden tablo varsa siler, böylece çakışma yaşanmaz.
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Ürünler Tablosu
CREATE TABLE products (
                          id SERIAL PRIMARY KEY,
                          name VARCHAR(255) NOT NULL,
                          main_category VARCHAR(100) NOT NULL,
                          sub_category VARCHAR(100) NOT NULL,
                          price DOUBLE PRECISION NOT NULL,
                          image_url VARCHAR(255)
);

-- Kullanıcılar Tablosu
CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       email VARCHAR(255) UNIQUE NOT NULL,
                       password VARCHAR(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS orders (
                                      id SERIAL PRIMARY KEY,
                                      user_email VARCHAR(255),
    total_amount DOUBLE PRECISION,
    address TEXT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );