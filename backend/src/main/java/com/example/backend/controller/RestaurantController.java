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

    
    @GetMapping("/{id}")
    public Restaurant getById(@PathVariable long id) {
        return service.findbyId(id);
    }

    @PostMapping
    public Restaurant create(HttpServletRequest request,@RequestBody Restaurant res) {


        String auth = request.getHeader("Authorization");
        String token = auth.substring(7);
        String username = JwtUtil.extractUsername(token);


        return service.createRestaurant(username,res);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id) {
        service.deletebyId(id);
    }

    @GetMapping("/novisad")
    public List<Restaurant> getNoviSad() {
        return service.getNoviSad();
    }

    @GetMapping("/beograd")
    public List<Restaurant> getBeograd() {
        return service.getBeograd();
    }
}