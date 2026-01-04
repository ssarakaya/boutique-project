package com.sarakaya.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "products") // Veritabanındaki tablo adı
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // PostgreSQL SERIAL tipiyle uyumludur
    private Long id;

    private String name;

    @Column(name = "main_category") // PostgreSQL'de sütun adı: main_category
    private String mainCategory;

    @Column(name = "sub_category")  // PostgreSQL'de sütun adı: sub_category
    private String subCategory;

    private Double price;

    @Column(name = "image_url")    // PostgreSQL'de sütun adı: image_url
    private String imageUrl;

    // JPA için gerekli boş constructor
    public Product() {}

    // DataLoader ve Manuel kayıtlar için constructor
    public Product(String name, String mainCategory, String subCategory, Double price, String imageUrl) {
        this.name = name;
        this.mainCategory = mainCategory;
        this.subCategory = subCategory;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    // ===== GETTER VE SETTERLAR =====
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getMainCategory() { return mainCategory; }
    public void setMainCategory(String mainCategory) { this.mainCategory = mainCategory; }

    public String getSubCategory() { return subCategory; }
    public void setSubCategory(String subCategory) { this.subCategory = subCategory; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}