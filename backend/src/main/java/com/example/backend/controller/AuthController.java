package com.example.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.backend.model.LoginRequest;
import com.example.backend.service.AuthService;


@Controller

public class AuthController {

    private final AuthService authservice;

    public AuthController(AuthService authservice) {
        this.authservice = authservice;
    }

    @PostMapping("/login")
public String login(@RequestBody LoginRequest request) {
    return authservice.login(request);
}
    
}
