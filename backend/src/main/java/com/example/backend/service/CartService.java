package com.example.backend.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.example.backend.model.Cart;
import com.example.backend.model.CartItem;
import com.example.backend.model.Item;
import com.example.backend.model.User;
import com.example.backend.repository.CartRepo;
import com.example.backend.repository.ItemRepo;
import com.example.backend.repository.UserRepo;

@Service
public class CartService {

    private final CartRepo repo;
    private final ItemRepo itemRepo;
    private final UserRepo userRepo;

    public CartService(CartRepo repo, ItemRepo itemRepo, UserRepo userRepo) {
        this.repo = repo;
        this.itemRepo = itemRepo;
        this.userRepo = userRepo;
    }

    private Cart resolveOrCreateCart(String userKey) {

        Cart cart;

        if (userKey.startsWith("guest_")) {
            String guestId = userKey.replace("guest_", "");
            cart = repo.findByGuestId(guestId);

            if (cart == null) {
                cart = new Cart();
                cart.setGuestId(guestId);
                cart.setItems(new ArrayList<>());
                return repo.save(cart);
            }

        } else {
            User user = userRepo.findByUsername(userKey)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            cart = repo.findByUserId(user.getId());

            if (cart == null) {
                cart = new Cart();
                cart.setUser(user);
                cart.setItems(new ArrayList<>());
                return repo.save(cart);
            }
        }

        if (cart.getItems() == null) {
            cart.setItems(new ArrayList<>());
        }

        return cart;
    }

    public void addToCart(String userKey, Long itemId) {

        Cart cart = resolveOrCreateCart(userKey);

        Item item = itemRepo.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        if (cart.getRestaurant() == null) {
            cart.setRestaurant(item.getRestaurant());
        }

        if (!cart.getRestaurant().getId().equals(item.getRestaurant().getId())) {
            cart.getItems().clear();
            cart.setRestaurant(item.getRestaurant());
        }

        CartItem existing = cart.getItems().stream()
                .filter(ci -> ci.getItem().getId().equals(itemId))
                .findFirst()
                .orElse(null);

        if (existing != null) {
            existing.setQuantity(existing.getQuantity() + 1);
        } else {
            CartItem ci = new CartItem();
            ci.setCart(cart);
            ci.setItem(item);
            ci.setQuantity(1);
            cart.getItems().add(ci);
        }

        repo.save(cart);
    }

    public Cart getCart(String userKey) {
        return resolveOrCreateCart(userKey);
    }

    public void delete(String userKey, Long itemId) {

        Cart cart = resolveOrCreateCart(userKey);

        CartItem itemToRemove = cart.getItems().stream()
                .filter(ci -> ci.getItem().getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Item not in cart"));

        cart.getItems().remove(itemToRemove);

        repo.save(cart);
    }

  
    public void mergeCart(String username, String guestId) {

        if (username == null || guestId == null) return;

        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart guestCart = repo.findByGuestId(guestId);
        if (guestCart == null) return;

        Cart userCart = repo.findByUserId(user.getId());

        if (userCart == null) {
            guestCart.setUser(user);
            guestCart.setGuestId(null);
            repo.save(guestCart);
            return;
        }

        for (CartItem guestItem : guestCart.getItems()) {

            CartItem existing = userCart.getItems().stream()
                    .filter(ci -> ci.getItem().getId().equals(guestItem.getItem().getId()))
                    .findFirst()
                    .orElse(null);

            if (existing != null) {
                existing.setQuantity(existing.getQuantity() + guestItem.getQuantity());
            } else {
                guestItem.setCart(userCart);
                userCart.getItems().add(guestItem);
            }
        }

        repo.save(userCart);
        repo.delete(guestCart); 
    }
}