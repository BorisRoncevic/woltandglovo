package com.example.backend.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.model.City;
import com.example.backend.model.Restaurant;
import com.example.backend.model.User;




@Repository
public interface RestaurantRepo extends JpaRepository<Restaurant, Long> {
    List<Restaurant> findByCity(City city);
    List<Restaurant> findByOwner(User owner);

}