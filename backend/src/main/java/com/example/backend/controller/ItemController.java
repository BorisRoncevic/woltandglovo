package com.example.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Item;
import com.example.backend.model.ItemRequest;
import com.example.backend.service.ItemService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/items")
public class ItemController {

    private final ItemService service;

    public ItemController(ItemService service) {
        this.service = service;
    }


    @GetMapping
    public List<Item> getAll() {
        return service.findAll();
    }

 
    @GetMapping("/{id}")
    public Item getById(@PathVariable Long id) {
        return service.findById(id);
    }

 
    @GetMapping("/restaurant/{restaurantId}")
    public List<Item> getByRestaurant(@PathVariable Long restaurantId) {
        return service.getItemsByRestaurant(restaurantId);
    }


    @PostMapping
public ResponseEntity<?> create(
        @RequestBody ItemRequest request,
        HttpServletRequest httpRequest) {

    String username = (String) httpRequest.getAttribute("username");

    
    Item item = service.save(request, username);
    
    System.out.println("SAVED ITEM: " + item);
    return ResponseEntity.ok(item);
}

  
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteById(id);
    }
}