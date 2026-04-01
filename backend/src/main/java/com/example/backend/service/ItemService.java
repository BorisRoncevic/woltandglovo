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
        List<Item> restorani = repo.findAll();
        return restorani;

    }


    public Item findbyId(long id) {
        return repo.findById(id).orElse(new Item());
    }

    public void deletebyId(long id) {
        repo.deleteById(id);
    }

    public Item save(Item res) {
        return repo.save(res);
    }
    
      public List<Item> getItemsByRestoran(Long restoranId) {
        return repo.findByRestaurantId(restoranId);
    }



    

}


