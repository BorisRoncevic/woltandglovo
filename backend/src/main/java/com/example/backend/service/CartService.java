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
    private final UserRepo repou;

    public CartService(CartRepo repo, ItemRepo itemRepo, UserRepo repou) {
        this.repo = repo;
        this.itemRepo = itemRepo;
        this.repou = repou;
    }

    public Cart save(Cart cart) {
        return repo.save(cart);
    }

    public void addToCart(String username, Long itemId) {

        // 1. user
        User user = repou.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. cart
        Cart cart = repo.findByUserId(user.getId());

        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
            cart.setItems(new ArrayList<>());
            cart = repo.save(cart);
        }

        // zaštita ako items nije inicijalizovan
        if (cart.getItems() == null) {
            cart.setItems(new ArrayList<>());
        }

        // 3. item
        Item item = itemRepo.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        // 4. ako nema restoran
        if (cart.getRestaurant() == null) {
            cart.setRestaurant(item.getRestaurant());
        }

        // 5. ako je drugi restoran → reset
        if (!cart.getRestaurant().getId().equals(item.getRestaurant().getId())) {
            cart.getItems().clear();
            cart.setRestaurant(item.getRestaurant());
        }

        // 6. da li već postoji item
        CartItem existing = cart.getItems().stream()
                .filter(ci -> ci.getItem().getId().equals(itemId))
                .findFirst()
                .orElse(null);

        if (existing != null) {
            existing.setQuantity(existing.getQuantity() + 1);
        } else {
            CartItem cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setItem(item);
            cartItem.setQuantity(1);

            cart.getItems().add(cartItem);
        }

        // 7. save
        repo.save(cart);
    }

    public Cart getCart(String username) {

        User user = repou.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
    
        Cart cart = repo.findByUserId(user.getId());
    
        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
            cart.setItems(new ArrayList<>());
            return cart;
        }
    
        if (cart.getItems() == null) {
            cart.setItems(new ArrayList<>());
        }
    
        return cart;
    }



    public Cart ResolveCart(String username,String guestId ) {
        if(username != null) {
            User user = repou.findByUsername(username).orElseThrow(()-> new RuntimeException("ne"));
            return repo.findByUserId(user.getId());
        }
        if(guestId!= null ) {
            return repo.findByGuestId(guestId);
        }

        return null;
    }

    private Cart resolveOrCreateCart(String username, String guestId) {

        Cart cart = ResolveCart(username, guestId);

        if (cart != null) return cart;

        cart = new Cart();
        cart.setItems(new ArrayList<>());

        if (username != null) {
            User user = repou.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            cart.setUser(user);
        } else {
            cart.setGuestId(guestId);
        }

        return repo.save(cart);
    }
    public void delete(String username, Long itemId) {

        User user = repou.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    
        Cart cart = repo.findByUserId(user.getId());
    
        if (cart == null || cart.getItems() == null) {
            throw new RuntimeException("Cart is empty");
        }
    
        CartItem itemToRemove = cart.getItems().stream()
                .filter(ci -> ci.getItem().getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Item not in cart"));
    
        cart.getItems().remove(itemToRemove);
    
        repo.save(cart);
    }


    public void MergeCart(String username,String guestId ) {
        if (username == null || guestId == null) return;
        User user = repou.findByUsername(username).orElseThrow(() -> new RuntimeException("aa"));


        Cart guestCart = repo.findByGuestId(guestId);
        Cart userCart = repo.findByUserId(user.getId());

        if(guestCart== null) return;

        if(userCart == null) {
            userCart.setUser(user);
            userCart.setGuestId(null);
            repo.save(guestCart);
        }


        for (CartItem guestItem : guestCart.getItems() ){
            CartItem existing = userCart.getItems().stream().filter(ci -> ci.getItem().getId().equals(guestItem.getItem().getId()))
            .findFirst().orElse(null);
        
            if(existing!= null) {
                existing.setQuantity(existing.getQuantity() + guestItem.getQuantity());

            } else {
                guestItem.setCart(userCart);
                userCart.getItems().add(guestItem);
            }

            repo.delete(guestCart);
            repo.save(userCart);

        }
    }


}