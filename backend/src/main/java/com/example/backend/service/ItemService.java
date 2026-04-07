package com.example.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.model.Item;
import com.example.backend.repository.ItemRepo;

@Service
public class ItemService {

    private final ItemRepo repo;

    public ItemService(ItemRepo repo) {
        this.repo = repo;
    }

    public List<Item> findAll() {
        return repo.findAll();
    }


    public Item findById(long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));
    }

 
    public void deleteById(long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Item not found");
        }
        repo.deleteById(id);
    }


    public Item save(Item item) {
        return repo.save(item);
    }

   
    public List<Item> getItemsByRestaurant(Long restaurantId) {
        return repo.findByRestaurantId(restaurantId);
    }
}



    




