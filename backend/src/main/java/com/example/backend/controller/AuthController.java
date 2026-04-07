package com.example.backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.AuthResponse;
import com.example.backend.model.LoginRequest;
import com.example.backend.service.AuthService;
import com.example.backend.service.CartService;

@RestController
public class AuthController {

    private final AuthService authService;
    private final CartService cartService;

    public AuthController(AuthService authService, CartService cartService) {
        this.authService = authService;
        this.cartService = cartService;
    }

    @PostMapping("/login")
    public AuthResponse login(
            @RequestBody LoginRequest request,
            @RequestHeader(value = "X-Guest-Id", required = false) String guestId
    ) {

        AuthResponse res = authService.login(request);

        if (guestId != null && !guestId.isEmpty()) {
            cartService.mergeCart(res.getUsername(), guestId);
        }

        return res;
    }
}
