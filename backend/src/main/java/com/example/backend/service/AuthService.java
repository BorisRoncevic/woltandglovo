package com.example.backend.service;

import org.springframework.stereotype.Service;

import com.example.backend.model.AuthResponse;
import com.example.backend.model.JwtUtil;
import com.example.backend.model.LoginRequest;
import com.example.backend.model.RegisterRequest;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepo;


@Service
public class AuthService {


    UserRepo repo;



    public AuthService(UserRepo repo) {
        this.repo = repo;
    }






    public AuthResponse login(LoginRequest request) {

        User user = repo.findByUsername(request.username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    
        if (!user.getPassword().equals(request.password)) {
            throw new RuntimeException("Wrong password");
        }
        String token =  JwtUtil.generateToken(user.getUsername());
        return new AuthResponse(token,user.getUsername());

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
        user.setPassword(request.password);
    
        return repo.save(user);
    }
    
}
