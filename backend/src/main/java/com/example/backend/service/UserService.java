package com.example.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.model.Order;
import com.example.backend.model.OrderStatus;
import com.example.backend.model.User;
import com.example.backend.repository.OrderRepo;
import com.example.backend.repository.UserRepo;

@Service
public class UserService {


    OrderRepo repo2;
    UserRepo repo;


    public UserService(UserRepo repo,OrderRepo repo2) {
        this.repo = repo;
        this.repo2 = repo2;
    }

    public Order delivered(Long orId) {

        Order or = repo2.findById(orId).get();
        or.setStatus(OrderStatus.DELIVERED);
        return repo2.save(or);
        
    }

    public List<Order> getMyOrders(Long userId) {
        return repo2.findByKorisnikId(userId);
    }


    public User save(User user ) {
        return repo.save(user);
    }





}
