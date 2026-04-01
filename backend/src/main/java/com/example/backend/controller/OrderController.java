package com.example.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.JwtUtil;
import com.example.backend.model.Order;
import com.example.backend.repository.UserRepo;
import com.example.backend.service.OrderService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService service;
   // private final UserRepo repo;

    public OrderController(OrderService service,UserRepo repo) {
        this.service = service;
        //this.repo = repo;
    }

    // ✅ svi orderi
    @GetMapping("/myOrders")
    public List<Order> getMyOrders(HttpServletRequest request) {

        String auth = request.getHeader("Authorization");
        String token = auth.substring(7);
        String username = JwtUtil.extractUsername(token);
        return service.findMy(username);
        
    }

    // ✅ order po id
    @GetMapping("/{id}")
    public Order getById(@PathVariable Long id) {
        return service.findbyId(id);
    }

    // ✅ delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deletebyId(id);
    }

    // ✅ create (ručno)
    @PostMapping
    public Order create(@RequestBody Order order) {
        return service.save(order);
    }

    // 🔥 NAJBITNIJI ENDPOINT — complete order
    @PostMapping("/complete")
    public Order completeOrder(HttpServletRequest request) {
    
        String auth = request.getHeader("Authorization");
        String token = auth.substring(7);
    
        String username = JwtUtil.extractUsername(token);
    
        return service.completeOrder(username);
    }
    @PostMapping("/{id}/accept")
    public Order acceptOrder(HttpServletRequest request,
                             @PathVariable Long id) {
    
        String token = request.getHeader("Authorization").substring(7);
        String username = JwtUtil.extractUsername(token);
    
        return service.acceptOrder(username, id);
    }
}