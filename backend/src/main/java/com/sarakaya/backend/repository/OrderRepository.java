package com.sarakaya.backend.repository;

import com.sarakaya.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    // E-postaya göre siparişleri bulmak için özel metod
    List<Order> findByUserEmail(String userEmail);
}