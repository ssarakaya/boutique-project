package com.sarakaya.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    private Integer quantity; // Kaç adet alındı?
    private Double priceAtPurchase; // Satın alındığı andaki fiyat

    // --- HATAYI ÇÖZEN VE İLİŞKİYİ KURAN KISIM ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    @JsonBackReference // Siparişleri listelerken sonsuz döngüye girmesini engeller
    private Order order;

    public OrderItem() {}

    // GETTERS AND SETTERS
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public Double getPriceAtPurchase() { return priceAtPurchase; }
    public void setPriceAtPurchase(Double priceAtPurchase) { this.priceAtPurchase = priceAtPurchase; }

    // OrderController içindeki "Cannot resolve method setOrder" hatasını bu metod çözer:
    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }
}