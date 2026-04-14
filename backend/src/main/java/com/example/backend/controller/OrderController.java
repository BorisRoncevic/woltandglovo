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
import com.example.backend.repository.OrderRepo;
import com.example.backend.repository.RestaurantRepo;
import com.example.backend.repository.UserRepo;
import com.example.backend.service.OrderService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService service;
    private final RestaurantRepo restaurantRepo;
    private final OrderRepo repo2;
   // private final UserRepo repo;

    public OrderController(OrderService service,UserRepo repo,RestaurantRepo restaurantRepo,OrderRepo repo2) {
        this.service = service;
        this.restaurantRepo = restaurantRepo;
        this.repo2 = repo2;
        //this.repo = repo;
    }

   
    @GetMapping("/myOrders")
    public List<Order> getMyOrders(HttpServletRequest request) {

        String auth = request.getHeader("Authorization");
        String token = auth.substring(7);
        String username = JwtUtil.extractUsername(token);
        return service.findMy(username);
        
    }


    @GetMapping("/restaurant/{id}")
    public List<Order> getOrdersByRestaurant(
            @PathVariable Long id,
            HttpServletRequest request) {

        String username = (String) request.getAttribute("username");
        return service.getOrdersByRestaurant(id, username);
    }

    @GetMapping("/{id}")
    public Order getById(@PathVariable Long id) {
        return service.findbyId(id);
    }

 
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deletebyId(id);
    }

    
    @PostMapping
    public Order create(@RequestBody Order order) {
        return service.save(order);
    }

    
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

    @PostMapping("/{id}/reject")
    public Order rejectOrder(HttpServletRequest request,
                             @PathVariable Long id) {
    
        String token = request.getHeader("Authorization").substring(7);
        String username = JwtUtil.extractUsername(token);
    
        return service.rejectOrder(username, id);
    }
    @PostMapping("/{id}/pickedUp")
    public Order pickedUp(HttpServletRequest request,
                             @PathVariable Long id) {
    
        String token = request.getHeader("Authorization").substring(7);
        String username = JwtUtil.extractUsername(token);
    
        return service.pickedUp(username, id);
    }
    @PostMapping("/{id}/delivered")
    public Order delivered(HttpServletRequest request,
                             @PathVariable Long id) {
    
        String token = request.getHeader("Authorization").substring(7);
        String username = JwtUtil.extractUsername(token);
    
        return service.delivered(username, id);
    }
}