package com.example.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.model.Item;
import com.example.backend.model.ItemRequest;
import com.example.backend.model.Restaurant;
import com.example.backend.repository.ItemRepo;
import com.example.backend.repository.RestaurantRepo;

@Service
public class ItemService {

    private final ItemRepo repo;
    private final RestaurantRepo repo2;

    public ItemService(ItemRepo repo,RestaurantRepo repo2) {
        this.repo = repo;
        this.repo2 = repo2;
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


    public Item save(ItemRequest request, String username) {

        Restaurant restaurant = repo2.findById(request.restaurantId)
                .orElseThrow();
    
        if (!restaurant.getOwner().getUsername().equals(username)) {
            throw new RuntimeException("Not your restaurant");
        }
    
        Item item = new Item();
        item.setName(request.name);
        item.setDescription(request.description);
        item.setPrice(request.price);
        item.setRestaurant(restaurant);
    
        return repo.save(item);
    }
   
    public List<Item> getItemsByRestaurant(Long restaurantId) {
        return repo.findByRestaurantId(restaurantId);
    }
}



    




