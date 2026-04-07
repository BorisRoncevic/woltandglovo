package com.example.backend.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.model.AuthResponse;
import com.example.backend.model.JwtUtil;
import com.example.backend.model.LoginRequest;
import com.example.backend.model.RegisterRequest;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepo;

@Service
public class AuthService {

    private final UserRepo repo;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public AuthService(UserRepo repo) {
        this.repo = repo;
    }
    public AuthResponse login(LoginRequest request) {

        User user = repo.findByUsername(request.username)
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!encoder.matches(request.password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = JwtUtil.generateToken(user.getUsername());

        return new AuthResponse(token, user.getUsername());
    }

    public User register(RegisterRequest request) {

        if (repo.findByUsername(request.username).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setName(request.name);
        user.setSurname(request.surname);
        user.setYears(request.years);
        user.setUsername(request.username);

        // 🔐 hash password
        user.setPassword(encoder.encode(request.password));

        return repo.save(user);
    }
}
