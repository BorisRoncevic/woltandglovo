package com.example.backend.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.model.Order;
import com.example.backend.model.OrderStatus;




@Repository
public interface OrderRepo extends JpaRepository<Order, Long> {
    List<Order> findByStatus(OrderStatus status);
    List<Order> findByKorisnikId(Long userId);
    List<Order> findByRestaurantId(Long restaurantId);


}