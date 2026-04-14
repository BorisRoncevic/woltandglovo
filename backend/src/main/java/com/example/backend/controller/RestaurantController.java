package com.example.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.City;
import com.example.backend.model.JwtUtil;
import com.example.backend.model.Restaurant;
import com.example.backend.service.RestaurantService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/restaurants")
public class RestaurantController {

    private final RestaurantService service;

    public RestaurantController(RestaurantService service) {
        this.service = service;
    }


    @GetMapping
    public List<Restaurant> getAll() {
        return service.findAll();
    }


    @GetMapping("/details/{id}")
    public Restaurant getById(@PathVariable long id) {
        return service.findById(id);
    }

   
    @PostMapping
    public ResponseEntity<?> create(HttpServletRequest request,
                             @RequestBody Restaurant res) {
                                System.out.println("USAO U CONTROLER: " );


        String username = extractUsername(request);
        System.out.println("USERNAME: " + username);
         service.createRestaurant(username, res);
         return ResponseEntity.status(HttpStatus.CREATED).body(res)
         ;

    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id) {
        service.deleteById(id);
    }

   
    @GetMapping("/city")
    public List<Restaurant> getByCity(@RequestParam City city) {
        System.out.println(city);

        return service.getByCity(city);
    }
    @GetMapping("/my")
    public List<Restaurant> getMyRestaurants(HttpServletRequest request) {
    
        String username = (String) request.getAttribute("username");
    
        return service.getByOwner(username);
    }
 
    private String extractUsername(HttpServletRequest request) {

        String auth = request.getHeader("Authorization");

        if (auth == null || !auth.startsWith("Bearer ")) {
            throw new RuntimeException("Missing or invalid token");
        }

        String token = auth.substring(7);
        return JwtUtil.extractUsername(token);
    }
}