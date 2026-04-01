package com.example.backend.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    // ✅ dodavanje itema u cart
    @PostMapping("/add")
public void addToCart(HttpServletRequest request,
                      @RequestParam Long itemId) {

    String auth = request.getHeader("Authorization");
    String token = auth.substring(7);

    String username = JwtUtil.extractUsername(token);

    service.addToCart(username, itemId);
}

    // ✅ dohvati cart (ako dodaš metodu u service)
    @GetMapping
    public Cart getCart(HttpServletRequest request) {

        String auth = request.getHeader("Authorization");
        String token = auth.substring(7);
    
        String username = JwtUtil.extractUsername(token);
    
       return service.getCart(username);
    }

    @DeleteMapping("/delete")
    public void deleteItem(HttpServletRequest request,Long itemId){
        String auth = request.getHeader("Authorization");
        String token = auth.substring(7);
    
        String username = JwtUtil.extractUsername(token);
        service.delete(username, itemId);

    }

}