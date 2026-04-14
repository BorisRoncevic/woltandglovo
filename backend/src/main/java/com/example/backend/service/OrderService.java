package com.example.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.model.Cart;
import com.example.backend.model.CartItem;
import com.example.backend.model.Order;
import com.example.backend.model.OrderItem;
import com.example.backend.model.OrderStatus;
import com.example.backend.model.Restaurant;
import com.example.backend.model.User;
import com.example.backend.repository.CartRepo;
import com.example.backend.repository.OrderRepo;
import com.example.backend.repository.RestaurantRepo;
import com.example.backend.repository.UserRepo;

@Service
public class OrderService {

    private final OrderRepo repo;
    private final  CartRepo repo2;
    private final UserRepo repo3;
    private final RestaurantRepo repo4;

    
    public OrderService(OrderRepo repo,CartRepo repo2,UserRepo repo3,RestaurantRepo repo4) {
        this.repo = repo;
        this.repo2 = repo2;
        this.repo3 = repo3;
        this.repo4 = repo4;
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
        return repo.findById(id)
        .orElseThrow(() -> new RuntimeException("Order not found"));    }

    public void deletebyId(long id) {
        repo.deleteById(id);
    }

    public Order save(Order order) {
        return repo.save(order);
    }
    public Order acceptOrder(String username, Long orderId) {

        User user = repo3.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
    
        Order order = repo.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found"));
    
        
        if (order.getStatus() != OrderStatus.PENDING) {
            throw new RuntimeException("Order not pending");
        }
    
        order.setStatus(OrderStatus.PREPARING);
    
        return repo.save(order);
    }

    public Order rejectOrder(String username, Long orderId) {

        User user = repo3.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
    
        Order order = repo.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found"));
    
        
        if (order.getStatus() != OrderStatus.PENDING) {
            throw new RuntimeException("Order not pending");
        }
    
        order.setStatus(OrderStatus.REJECTED);
    
        return repo.save(order);
    }

    public Order pickedUp(String username, Long orderId) {

        User user = repo3.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
    
        Order order = repo.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found"));
    
        
        if (order.getStatus() != OrderStatus.PREPARING) {
            throw new RuntimeException("Order not preparing");
        }
    
        order.setStatus(OrderStatus.DELIVERING);
    
        return repo.save(order);
    }

    public Order delivered(String username, Long orderId) {

        User user = repo3.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
    
        Order order = repo.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found"));
    
        
        if (order.getStatus() != OrderStatus.DELIVERING) {
            throw new RuntimeException("Order not pending");
        }
    
        order.setStatus(OrderStatus.DELIVERED);
    
        return repo.save(order);
    }

 
    public List<Order> getOrdersByRestaurant(Long restaurantId, String username) {

        Restaurant restaurant = repo4.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        if (!restaurant.getOwner().getUsername().equals(username)) {
            throw new RuntimeException("Not your restaurant");
        }

        return repo.findByRestaurantId(restaurantId);
    }

    public Order completeOrder(String username) {

        System.out.println("USERNAME: " + username);
    
        User user = repo3.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
    
        System.out.println("USER ID: " + user.getId());
    
        Cart cart = repo2.findByUserId(user.getId());
    
        System.out.println("CART: " + cart);
    
        if (cart == null) {
            throw new RuntimeException("Cart is null");
        }
    
        System.out.println("ITEM COUNT: " + cart.getItems().size());
    
        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }
    
        Order order = new Order();
        order.setRestaurant(cart.getRestaurant());
        order.setKorisnik(cart.getUser());
        order.setStatus(OrderStatus.PENDING);
    
        List<OrderItem> orderItems = new ArrayList<>();
    
        for (CartItem ci : cart.getItems()) {
    
            System.out.println("PROCESSING ITEM: " + ci.getItem().getId());
    
            OrderItem oi = new OrderItem();
            oi.setOrder(order);
            oi.setItem(ci.getItem());
            oi.setKolicina(ci.getQuantity());
            oi.setCena(ci.getItem().getPrice());
    
            orderItems.add(oi);
        }
    
        order.setItems(orderItems);
    
        System.out.println("SAVING ORDER...");
    
        Order savedOrder = repo.save(order);
    
        System.out.println("ORDER SAVED ID: " + savedOrder.getId());
    
        cart.getItems().clear();
        repo2.save(cart);
    
        return savedOrder;
    }

    
       
 

 
}


