package com.sarakaya.backend.repository;

import com.sarakaya.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByMainCategory(String mainCategory);

    List<Product> findBySubCategory(String subCategory);
}
