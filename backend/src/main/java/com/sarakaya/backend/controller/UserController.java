package com.sarakaya.backend.controller;

import com.sarakaya.backend.model.User;
import com.sarakaya.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email zaten kayıtlı!");
        }
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {
        Optional<User> user = userRepository.findByEmail(loginUser.getEmail());
        if (user.isPresent() && user.get().getPassword().equals(loginUser.getPassword())) {

            // Şifreyi güvenlik için siliyoruz ve kullanıcı nesnesini isimiyle beraber dönüyoruz
            User foundUser = user.get();
            foundUser.setPassword(null);
            return ResponseEntity.ok(foundUser);
        }
        return ResponseEntity.status(401).body("E-posta veya şifre hatalı!");
    }
}