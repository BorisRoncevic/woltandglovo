package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.model.Item;




@Repository
public interface ItemRepo extends JpaRepository<Item, Long> {
    List<Item> findByRestaurantId(Long restoranId);

}