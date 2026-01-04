package com.sarakaya.backend.repository;

import com.sarakaya.backend.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    // Spring Data JPA, "Product" nesnesinin "id" alanına bakacağını otomatik anlar
    List<Comment> findByProductId(Long productId);
}