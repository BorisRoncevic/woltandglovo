package com.example.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.example.backend.model.AuthResponse;
import com.example.backend.model.LoginRequest;
import com.example.backend.service.AuthService;
import com.example.backend.service.CartService;


@Controller

public class AuthController {

    private final AuthService authservice;
    private final CartService cartService;


    public AuthController(AuthService authservice,CartService cartService) {
        this.authservice = authservice;
        this.cartService = cartService;
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request,
                              @RequestHeader(value = "X-Guest-Id", required = false) String guestId) {
    
        AuthResponse res = authservice.login(request);
    
        cartService.MergeCart(res.getUsername(), guestId);
    
        return res;
    }
    
}
