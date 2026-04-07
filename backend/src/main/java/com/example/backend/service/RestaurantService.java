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

    private final RestaurantRepo restaurantRepo;
    private final OrderRepo orderRepo;
    private final UserRepo userRepo;

    public RestaurantService(RestaurantRepo restaurantRepo,
                             OrderRepo orderRepo,
                             UserRepo userRepo) {
        this.restaurantRepo = restaurantRepo;
        this.orderRepo = orderRepo;
        this.userRepo = userRepo;
    }

   
    public List<Restaurant> findAll() {
        return restaurantRepo.findAll();
    }

    public Restaurant findById(long id) {
        return restaurantRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));
    }

    public void deleteById(long id) {
        if (!restaurantRepo.existsById(id)) {
            throw new RuntimeException("Restaurant not found");
        }
        restaurantRepo.deleteById(id);
    }

    public Restaurant save(Restaurant res) {
        return restaurantRepo.save(res);
    }


    public Restaurant createRestaurant(String username, Restaurant res) {

        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        res.setOwner(user);

        return restaurantRepo.save(res);
    }

    public List<Restaurant> getByCity(City city) {
        return restaurantRepo.findByCity(city);
    }

    public List<Order> getPendingOrders() {
        return orderRepo.findByStatus(OrderStatus.PENDING);
    }
}