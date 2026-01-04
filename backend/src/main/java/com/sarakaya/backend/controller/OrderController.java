package com.sarakaya.backend.controller;

import com.sarakaya.backend.model.Order;
import com.sarakaya.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
// Frontend (React) 3000 portunda çalıştığı için erişim izni veriyoruz
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    /**
     * Kullanıcı email adresine göre siparişleri getirir.
     * React tarafındaki fetch(`http://localhost:8081/api/orders/user/${email}`)
     * isteği ile tam uyumlu hale getirildi.
     */
    @GetMapping("/user/{email}")
    public List<Order> getOrdersByEmail(@PathVariable String email) {
        // Repository içindeki findByUserEmail metodunu çağırır
        return orderRepository.findByUserEmail(email);
    }

    /**
     * Yeni bir sipariş oluşturur.
     * Checkout sayfasından gelen verileri veritabanına kaydeder.
     */
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        try {
            // Sipariş içindeki her bir kalemi (OrderItem) sipariş ile ilişkilendiriyoruz
            if (order.getItems() != null) {
                order.getItems().forEach(item -> item.setOrder(order));
            }

            Order savedOrder = orderRepository.save(order);
            return ResponseEntity.ok(savedOrder);
        } catch (Exception e) {
            // Hata durumunda konsola yazdır ve 400 hatası dön
            System.out.println("Sipariş Kayıt Hatası: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
}