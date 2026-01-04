package com.sarakaya.backend.controller;

import com.sarakaya.backend.model.Comment;
import com.sarakaya.backend.model.Product;
import com.sarakaya.backend.repository.CommentRepository;
import com.sarakaya.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin("*")
public class CommentController {

    private final CommentRepository commentRepository;
    private final ProductRepository productRepository;

    @Autowired
    public CommentController(CommentRepository commentRepository, ProductRepository productRepository) {
        this.commentRepository = commentRepository;
        this.productRepository = productRepository;
    }

    @GetMapping("/{productId}")
    public List<Comment> getComments(@PathVariable Long productId) {
        return commentRepository.findByProductId(productId);
    }

    @PostMapping
    public Comment addComment(@RequestBody Comment comment) {
        // Eğer frontend'den gelen comment nesnesinde product.id varsa,
        // veritabanındaki gerçek ürünle ilişkilendiriyoruz.
        if (comment.getProduct() != null && comment.getProduct().getId() != null) {
            Product product = productRepository.findById(comment.getProduct().getId())
                    .orElseThrow(() -> new RuntimeException("Ürün bulunamadı!"));
            comment.setProduct(product);
        }
        return commentRepository.save(comment);
    }

    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable Long id) {
        commentRepository.deleteById(id);
    }
}