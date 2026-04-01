package com.example.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.model.City;
import com.example.backend.model.Order;
import com.example.backend.model.OrderStatus;
import com.example.backend.model.Restaurant;
import com.example.backend.model.User;
import com.example.backend.repository.OrderRepo;
import com.example.backend.repository.RestaurantRepo;
import com.example.backend.repository.UserRepo;




@Service
public class RestaurantService {


    private final  RestaurantRepo repo;
    private final OrderRepo repo2;
    private final UserRepo repo3;

    public RestaurantService(RestaurantRepo repo,OrderRepo repo2,UserRepo repo3) {
        this.repo = repo;
        this.repo2 = repo2;
        this.repo3 = repo3;
    }



    public List<Restaurant> findAll(){
        List<Restaurant> restorani = repo.findAll();
        return restorani;

    }

    public Restaurant findbyId(long id ) {
        return repo.findById(id).orElse(new Restaurant());
    }

    public void deletebyId(long id ) {
        repo.deleteById(id);
    }

    public Restaurant save(Restaurant res) {
        return repo.save(res);
    }


  
    public List<Order> getPending() {
        return repo2.findByStatus(OrderStatus.PENDING);
    }

    public Restaurant createRestaurant(String username, Restaurant res) {

        User user = repo3.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
    
        // ✔ veži restoran za user-a
        res.setOwner(user);
    
        return repo.save(res);
    }

    public List<Restaurant> getNoviSad() {
        return repo.findByCity(City.Novi_Sad);
    }

    public List<Restaurant> getBeograd() {
        return repo.findByCity(City.Beograd);
    }






}