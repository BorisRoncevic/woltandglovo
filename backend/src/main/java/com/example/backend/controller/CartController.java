package com.example.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.backend.model.Cart;
import com.example.backend.model.JwtUtil;
import com.example.backend.service.CartService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/cart")
public class CartController {

    private final CartService service;

    public CartController(CartService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public void addToCart(HttpServletRequest request,
                          @RequestParam Long itemId) {

        String userKey = resolveUser(request);
        service.addToCart(userKey, itemId);
    }

    @PostMapping("/merge")
public ResponseEntity<?> mergeCart(HttpServletRequest request,
                                   @RequestParam String guestId) {

    // ✔ iz JWT filtera
    String username = (String) request.getAttribute("username");

    if (username == null) {
        return ResponseEntity.status(401).body("Unauthorized");
    }

    service.mergeCart(username, guestId);

    return ResponseEntity.ok().build();
}

    @GetMapping
    public Cart getCart(HttpServletRequest request) {
        String userKey = resolveUser(request);
        return service.getCart(userKey);
    }

    @DeleteMapping("/delete")
    public void deleteItem(HttpServletRequest request,
                           @RequestParam Long itemId) {

        String userKey = resolveUser(request);
        service.delete(userKey, itemId);
    }

  
    private String resolveUser(HttpServletRequest request) {

        String auth = request.getHeader("Authorization");

        if (auth != null && auth.startsWith("Bearer ")) {
            try {
                String token = auth.substring(7);
                return JwtUtil.extractUsername(token);
            } catch (Exception e) {
                throw new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Invalid JWT"
                );
            }
        }

        String guestId = request.getHeader("X-Guest-Id");

        if (guestId != null && !guestId.isEmpty()) {
            return "guest_" + guestId;
        }

        throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "No identity provided"
        );
    }
}