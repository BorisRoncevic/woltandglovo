package com.example.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.model.Cart;
import com.example.backend.model.CartItem;
import com.example.backend.model.Order;
import com.example.backend.model.OrderItem;
import com.example.backend.model.OrderStatus;
import com.example.backend.model.User;
import com.example.backend.repository.CartRepo;
import com.example.backend.repository.OrderRepo;
import com.example.backend.repository.UserRepo;

@Service
public class OrderService {

    private final OrderRepo repo;
    private final  CartRepo repo2;
    private final UserRepo repo3;

    
    public OrderService(OrderRepo repo,CartRepo repo2,UserRepo repo3) {
        this.repo = repo;
        this.repo2 = repo2;
        this.repo3 = repo3;
    }

    public List<Order> findAll() {
        List<Order> orders = repo.findAll();
        return orders;

    }

    public List<Order> findMy(String username ) {
        User user = repo3.findByUsername(username).orElseThrow();
        List<Order> orders = repo.findByKorisnikId(user.getId());
        return orders;


    }


    public Order findbyId(long id) {
        return repo.findById(id).orElse(new Order());
    }

    public void deletebyId(long id) {
        repo.deleteById(id);
    }

    public Order save(Order order) {
        return repo.save(order);
    }
    public Order acceptOrder(String username, Long orderId) {

        //User user = repo3.findByUsername(username)
            //.orElseThrow(() -> new RuntimeException("User not found"));
    
        Order order = repo.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found"));
    
        
        // 🔥 3. status check
        if (order.getStatus() != OrderStatus.PENDING) {
            throw new RuntimeException("Order not pending");
        }
    
        order.setStatus(OrderStatus.ACCEPTED);
    
        return repo.save(order);
    }

    public Order completeOrder(String username) {

        User user = repo3.findByUsername(username)
        .orElseThrow();

        // 1. nadji cart
        Cart cart = repo2.findByUserId(user.getId());
    
        if (cart == null || cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }
    
        // 2. napravi order
        Order order = new Order();
        order.setRestaurant(cart.getRestaurant());
        order.setKorisnik(cart.getUser());
        order.setStatus(OrderStatus.PENDING);
    
        List<OrderItem> orderItems = new ArrayList<>();
    
        // 3. mapiraj CartItem → OrderItem
        for (CartItem ci : cart.getItems()) {
    
            OrderItem oi = new OrderItem();
            oi.setOrder(order);
            oi.setItem(ci.getItem());
            oi.setKolicina(ci.getQuantity());
            oi.setCena(ci.getItem().getCena());
    
            orderItems.add(oi);
        }
    
        order.setItems(orderItems);
    
        // 4. sacuvaj order (cascade ce sacuvati OrderItem)
        Order savedOrder = repo.save(order);
    
        // 5. isprazni cart
        cart.getItems().clear();
        repo2.save(cart);
    
        return savedOrder;
    }
 

 
}


