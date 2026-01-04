package com.sarakaya.backend.controller;

import com.sarakaya.backend.model.Product;
import com.sarakaya.backend.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // TÜM ÜRÜNLER
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // TEK ÜRÜN (DETAY SAYFASI)
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productRepository.findById(id).orElse(null);
    }
}
